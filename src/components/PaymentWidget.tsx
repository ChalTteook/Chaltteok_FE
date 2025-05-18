import React, { useEffect } from "react"; // Import useEffect
import { View, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import WebView from "react-native-webview";
import { PaymentRequest } from "../types/payment";
import { useNavigation } from "@react-navigation/native";
import { Linking, Platform } from "react-native";

interface PaymentWidgetProps {
  clientKey: string;
  customerKey: string;
  paymentRequest: PaymentRequest;
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
}

const PaymentWidget: React.FC<PaymentWidgetProps> = ({
  clientKey,
  customerKey,
  paymentRequest,
  onSuccess,
  onError,
}) => {
  const navigation = useNavigation(); // Initialize navigation

  useEffect(() => {
    // Hide the header when the component mounts
    navigation.setOptions({ headerShown: false });

    // Restore the header when the component unmounts
    return () => navigation.setOptions({ headerShown: true });
  }, [navigation]);

  const html = `
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <script src="https://js.tosspayments.com/v2/standard"></script>
    <style>
      .button {
        background-color: #0064FF; /* 토스 블루 */
        color: white;
        padding: 18px 0; /* 높이 강조, 좌우는 0으로 하고 width로 조정 */
        font-size: 20px; /* 더 큰 폰트 */
        font-weight: 700;
        border: none;
        border-radius: 12px; /* 더 둥글게 */
        cursor: pointer;
        width: 100%; /* 전체 너비 */
        max-width: 400px; /* 최대 너비 제한 */
        box-shadow: 0 2px 8px 0 rgba(0, 100, 255, 0.08);
        transition: background 0.2s;
        display: block;
        margin: 30px auto 0 auto; /* 중앙 정렬 및 위쪽 마진 */
      }
      .button:hover {
        background-color: #0052cc; /* 호버 시 더 짙은 파랑 */
      }
      .button:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
      }
    </style>
  </head>
  <body>
    <div id="payment-method"></div>
    <div id="agreement"></div>
    <button class="button" id="payment-button">결제하기</button>
    <div id="result-message" style="margin-top:20px;color:#FF4081;"></div>

    <script>
      function getQueryParam(name) {
        const url = new URL(window.location.href);
        return url.searchParams.get(name);
      }

      main();

      async function main() {
        const button = document.getElementById("payment-button");
        const resultMessage = document.getElementById("result-message");

        // 쿼리스트링에서 결제 정보 읽기
        const amount = Number(getQueryParam('amount')) || 50000;
        const orderName = getQueryParam('orderName') || "토스 티셔츠 외 2건";
        const orderId = getQueryParam('orderId') || "ORDER_DEFAULT";
        const customerName = getQueryParam('customerName') || "김토스";
        const customerEmail = getQueryParam('customerEmail') || "customer123@gmail.com";

        const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
        const tossPayments = TossPayments(clientKey);
        const customerKey = "qm1Uq6Y0AGhgSFKBBeGfN";
        const widgets = tossPayments.widgets({ customerKey });

        await widgets.setAmount({ currency: "KRW", value: amount });

        await Promise.all([
          widgets.renderPaymentMethods({ selector: "#payment-method" }),
          widgets.renderAgreement({ selector: "#agreement", variantKey: "AGREEMENT" }),
        ]);

        button.addEventListener("click", async function () {
          button.disabled = true;
          resultMessage.textContent = "";

          try {
            const response = await widgets.requestPayment({
              orderId,
              orderName,
              successUrl: "myapp://payment/success",
              failUrl: "myapp://payment/fail",
              customerEmail,
              customerName,
              customerMobilePhone: "01012341234",
            });

            if (window.ReactNativeWebView) {
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: "success",
                data: response,
              }));
            } else {
              resultMessage.textContent = "결제 성공! myapp://payment/success로 이동을 시도합니다.";
              window.location.href = "myapp://payment/success";
            }
          } catch (error) {
            if (window.ReactNativeWebView) {
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: "error",
                data: error,
              }));
            } else {
              resultMessage.textContent = "결제 실패! myapp://payment/fail로 이동을 시도합니다.";
              window.location.href = "myapp://payment/fail";
            }
            if (error?.message?.includes('redirect')) {
              console.error("⚡ ERR_TOO_MANY_REDIRECTS 발생 가능성 있음:", error);
            }
          } finally {
            button.disabled = false;
          }
        });
      }
    </script>
  </body>
</html>
  `;
  const handleMessage = (event: any) => {
    try {
      const { type, data } = JSON.parse(event.nativeEvent.data);
      if (type === "success") {
        onSuccess(data);
      } else if (type === "error") {
        onError(data);
      }
    } catch (error) {
      onError(error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <WebView
          source={{ uri: "https://chaltteoktossweb.netlify.app/" }}
          onMessage={handleMessage}
          style={styles.webview}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          originWhitelist={["*"]}
          sharedCookiesEnabled={true}
          thirdPartyCookiesEnabled={true}
          onShouldStartLoadWithRequest={(request) => {
            const { url } = request;
            console.log('WebView navigation url:', url);

            // 무한 리디렉션 방지: 네이버 결제 URL은 외부 브라우저에서 열기
            if (url.includes("pay.naver.com")) {
              Linking.openURL(url).catch((err) => {
                console.warn("Failed to open external browser:", err);
              });
              return false; // WebView에서 열지 않음
            }

            if (Platform.OS === "android" && url.startsWith("intent://")) {
              try {
                console.log('intent:// full url:', url);
                // #Intent; 이후 파라미터 분리
                const intentParams = url.split('#Intent;')[1]?.split(';') || [];
                let scheme: string | undefined, pkg: string | undefined;
                intentParams.forEach(param => {
                  if (param.startsWith('scheme=')) scheme = param.replace('scheme=', '');
                  if (param.startsWith('package=')) pkg = param.replace('package=', '');
                });
                
                // BC카드/ISP 등을 위한 특별 처리
                if (scheme === 'ispmobile' || scheme === 'kftc-bankpay') {
                  console.log('BC카드/ISP 결제 앱 실행:', scheme);
                  Linking.openURL(`${scheme}://`).catch((e) => {
                    console.warn('앱 실행 실패, 마켓으로 이동', e);
                    if (pkg) {
                      Linking.openURL(`market://details?id=${pkg}`);
                    } else if (scheme === 'ispmobile') {
                      Linking.openURL('market://details?id=kvp.jjy.MispAndroid320');
                    } else if (scheme === 'kftc-bankpay') {
                      Linking.openURL('market://details?id=com.kftc.bankpay.android');
                    }
                  });
                  return false;
                }
                
                // 스킴 변환
                if (scheme === 'v3mobileplusweb') scheme = 'v3mobileplus';
                console.log('intent:// scheme:', scheme, 'package:', pkg);
                if (scheme && pkg) {
                  Linking.openURL(`${scheme}://`).catch((e) => {
                    console.warn('앱 실행 실패, 마켓으로 이동', e);
                    Linking.openURL(`market://details?id=${pkg}`);
                  });
                  return false;
                }
              } catch (e) {
                console.warn("intent:// 처리 실패:", e);
              }
              return false;
            }

            // myapp:// 등 커스텀 스킴은 Linking으로 처리
            if (url.startsWith('myapp://')) {
              Linking.openURL(url).catch((err) => {
                console.warn('딥링크 열기 실패:', err);
              });
              return false; // WebView에서 열지 않음
            }

            // market:// 등 커스텀 스킴은 Linking으로 처리
            if (url.startsWith('market://')) {
              Linking.openURL(url).catch((err) => {
                console.warn('마켓 스킴 열기 실패:', err);
              });
              return false; // WebView에서 열지 않음
            }

            return true;
          }}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn("WebView error: ", nativeEvent);
          }}
          onHttpError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn("WebView HTTP error: ", nativeEvent);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  webview: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
});

export default PaymentWidget;
