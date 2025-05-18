import React, { useEffect } from "react"; // Import useEffect
import { View, StyleSheet, SafeAreaView } from "react-native";
import WebView from "react-native-webview";
import { PaymentRequest } from "../types/payment";
import { Linking, Platform } from "react-native";

interface PaymentWidgetProps {
  clientKey: string;
  customerKey: string;
  paymentRequest: PaymentRequest;
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
  navigation?: any; // Add navigation as optional prop
}

const PaymentWidget: React.FC<PaymentWidgetProps> = ({
  clientKey,
  customerKey,
  paymentRequest,
  onSuccess,
  onError,
  navigation, // Receive navigation from parent
}) => {
  useEffect(() => {
    // Hide the header when the component mounts if navigation is provided
    if (navigation) {
      navigation.setOptions({ headerShown: false });

      // Restore the header when the component unmounts
      return () => navigation.setOptions({ headerShown: true });
    }
  }, [navigation]);

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
          source={{ uri: "https://chaltteoktossweb.netlify.app/?isMobile=true" }}
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
                
                // TID 파라미터 추출 (BC카드/ISP 등을 위한 처리)
                let tidParam = '';
                if (url.includes('TID=')) {
                  const tidMatch = url.match(/TID=([^#&]+)/);
                  if (tidMatch && tidMatch[1]) {
                    tidParam = tidMatch[1];
                  }
                }
                
                // #Intent; 이후 파라미터 분리
                const intentParams = url.split('#Intent;')[1]?.split(';') || [];
                let scheme: string | undefined, pkg: string | undefined;
                intentParams.forEach(param => {
                  if (param.startsWith('scheme=')) scheme = param.replace('scheme=', '');
                  if (param.startsWith('package=')) pkg = param.replace('package=', '');
                });
                
                console.log('추출된 결제 스키마:', scheme, '패키지:', pkg, 'TID:', tidParam);
                
                // BC카드/ISP 앱 실행 (TID 포함)
                if (scheme === 'ispmobile') {
                  console.log('BC카드/ISP 결제 앱 실행:', scheme, 'TID:', tidParam);
                  // BC카드/ISP는 URL 형식이 다름 - TID 파라미터는 URL에 직접 넣지 않고 다른 방식으로 처리해야 함
                  console.log('실행 URL: ispmobile://');
                  
                  // 다양한 URL 형식으로 시도 (BC카드/ISP는 기기마다 다를 수 있음)
                  const ispmobileUrls = [
                    'ispmobile://',                   // 기본 형식
                    `ispmobile://TID=${tidParam}`,    // TID를 쿼리 파라미터로
                    `ispmobile://tid=${tidParam}`,    // 소문자 tid
                    `ispmobile://${tidParam}`         // 직접 경로에
                  ];
                  
                  let urlIndex = 0;
                  
                  // 여러 URL 형식으로 순차적으로 시도하는 함수
                  const tryNextUrl = () => {
                    if (urlIndex >= ispmobileUrls.length) {
                      console.warn('모든 ispmobile URL 시도 실패, 마켓으로 이동');
                      Linking.openURL('market://details?id=kvp.jjy.MispAndroid320');
                      return;
                    }
                    
                    const currentUrl = ispmobileUrls[urlIndex];
                    console.log(`BC카드/ISP 시도 (${urlIndex+1}/${ispmobileUrls.length}):`, currentUrl);
                    
                    Linking.openURL(currentUrl).catch((e) => {
                      console.warn(`ispmobile URL ${currentUrl} 실행 실패:`, e);
                      urlIndex++;
                      // 짧은 딜레이 후 다음 URL 시도
                      setTimeout(tryNextUrl, 100);
                    });
                  };
                  
                  // 첫 번째 URL 시도
                  tryNextUrl();
                  return false;
                }
                
                // 다른 은행앱 실행
                if (scheme === 'kftc-bankpay') {
                  console.log('뱅크페이 앱 실행:', scheme, 'TID:', tidParam);
                  
                  // 다양한 URL 형식으로 시도 (뱅크페이도 기기마다 다를 수 있음)
                  const bankpayUrls = [
                    'kftc-bankpay://',                  // 기본 형식
                    `kftc-bankpay://call?a=${tidParam}`, // a 파라미터로
                    `kftc-bankpay://call?b=${tidParam}`, // b 파라미터로
                    `kftc-bankpay://${tidParam}`        // 직접 경로에
                  ];
                  
                  let urlIndex = 0;
                  
                  // 여러 URL 형식으로 순차적으로 시도하는 함수
                  const tryNextUrl = () => {
                    if (urlIndex >= bankpayUrls.length) {
                      console.warn('모든 뱅크페이 URL 시도 실패, 마켓으로 이동');
                      Linking.openURL('market://details?id=com.kftc.bankpay.android');
                      return;
                    }
                    
                    const currentUrl = bankpayUrls[urlIndex];
                    console.log(`뱅크페이 시도 (${urlIndex+1}/${bankpayUrls.length}):`, currentUrl);
                    
                    Linking.openURL(currentUrl).catch((e) => {
                      console.warn(`뱅크페이 URL ${currentUrl} 실행 실패:`, e);
                      urlIndex++;
                      // 짧은 딜레이 후 다음 URL 시도
                      setTimeout(tryNextUrl, 100);
                    });
                  };
                  
                  // 첫 번째 URL 시도
                  tryNextUrl();
                  return false;
                }
                
                // V3 모바일플러스 특별 처리
                if (scheme === 'v3mobileplusweb') {
                  scheme = 'v3mobileplus';
                }
                
                // 일반 인텐트 URL 처리
                if (scheme && pkg) {
                  // 결제 앱 실행
                  console.log(`결제 앱 실행: ${scheme}://`);
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

            // 한국 결제 앱 직접 호출 처리
            const koreanPaymentSchemes = [
              { scheme: 'ispmobile', package: 'kvp.jjy.MispAndroid320' }, // ISP/BC카드
              { scheme: 'kftc-bankpay', package: 'com.kftc.bankpay.android' }, // 뱅크페이
              { scheme: 'kb-acp', package: 'com.kbcard.kbkookmincard' }, // KB카드
              { scheme: 'hdcardappcardansimclick', package: 'com.hyundaicard.appcard' }, // 현대카드  
              { scheme: 'shinhan-sr-ansimclick', package: 'com.shcard.smartpay' }, // 신한카드
              { scheme: 'smshinhanansimclick', package: 'com.shcard.smartpay' }, // 신한카드(다른 스킴)
              { scheme: 'mpocket.online.ansimclick', package: 'kr.co.samsungcard.mpocket' }, // 삼성카드
              { scheme: 'wooripay', package: 'com.wooricard.wcard' }, // 우리카드
              { scheme: 'lottesmartpay', package: 'com.lcacApp' }, // 롯데카드
              { scheme: 'lpayapp', package: 'com.lotte.lpay' }, // 엘페이
              { scheme: 'kakaotalk', package: 'com.kakao.talk' }, // 카카오톡
              { scheme: 'naversearchapp', package: 'com.nhn.android.search' }, // 네이버
              { scheme: 'nhallonepayansimclick', package: 'com.nonghyup.nhallonepay' }, // NH농협카드
              { scheme: 'cloudpay', package: 'com.hanaskcard.paycla' }, // 하나카드
              { scheme: 'lguthepay-xpay', package: 'com.lguplus.paynow' }, // 페이나우
              { scheme: 'lmslpay', package: 'kr.co.lguplus.paynow' }, // 페이나우(다른 스킴)
              { scheme: 'chai', package: 'finance.chai.app' }, // 차이
              { scheme: 'payco', package: 'com.nhnent.payapp' }, // 페이코
              { scheme: 'tosspay', package: 'viva.republica.toss' } // 토스
            ];

            // 직접 결제 앱 호출 URL인 경우 처리
            for (const app of koreanPaymentSchemes) {
              if (url.startsWith(`${app.scheme}://`)) {
                console.log(`${app.scheme} 결제 앱 직접 호출:`, url);
                
                // 앱스토어에서 결제앱 미리 설치하도록 유도하기 위한 fallback URL
                const storeUrl = `market://details?id=${app.package}`;
                
                // 결제앱 실행 시도
                Linking.openURL(url)
                  .then(() => {
                    console.log(`${app.scheme} 앱 실행 성공`);
                  })
                  .catch((err) => {
                    console.warn(`${app.scheme} 앱 열기 실패, 마켓으로 이동:`, err);
                    
                    // 5초 딜레이 후 앱스토어 실행 (사용자 경험 개선)
                    setTimeout(() => {
                      Linking.openURL(storeUrl).catch(storeErr => {
                        console.error(`앱스토어 열기 실패:`, storeErr);
                      });
                    }, 500);
                  });
                
                return false; // WebView에서 열지 않음
              }
            }

            // myapp:// 등 커스텀 스킴은 Linking으로 처리
            if (url.startsWith('myapp://')) {
              Linking.openURL(url).catch((err) => {
                console.warn('딥링크 열기 실패:', err);
              });
              return false; // WebView에서 열지 않음
            }

            // market:// 등 스토어 스킴은 Linking으로 처리
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
