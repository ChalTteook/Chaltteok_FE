import { ExpoConfig, ConfigContext } from "@expo/config";

export default ({ config }: ConfigContext): ExpoConfig => {
  // 프로덕션 환경변수 (하드코딩)
  const envConfig = {
    kakaoRedirectUri: "https://chaltteok.com",
    kakaoRestApiKey: "fe0e720fbe5b74240985fb33256f2826",
    naverRedirectUri: "https://chaltteok.com",
    naverRestApiKey: "GK2ORFcjWGkcsqlGPh8M",
    baseURL: "https://chaltteok.com",
  };

  const expoConfig: ExpoConfig = {
    ...config,
    name: "찰칵의 덕후",
    slug: config.slug || "defaultSlug",
    icon: "./src/assets/big_logo.png",
    plugins: [
      [
        "expo-splash-screen",
        {
          resizeMode: "cover",
          backgroundColor: "#F71D6A", 
          image: "./src/assets/big_logo.png"
        }
      ]
    ],
    android: {
      adaptiveIcon: {
        foregroundImage: "./src/assets/big_logo.png",
        backgroundColor: "#FFFFFF"
      },
      package: "com.chaltteok.chaltteok_FE"
    },
    ios: {
      bundleIdentifier: "com.chaltteok.chaltteokFE"
    },
    extra: {
      ...envConfig,
      eas: {
        projectId: "267ee49b-7fdb-4c66-aa1b-f3397b8716d5"
      }
    },
    version: "1.1.3",
    scheme: "myapp"
  };

  return expoConfig;
};    