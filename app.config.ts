import { ExpoConfig, ConfigContext } from "@expo/config";
import * as dotenv from "dotenv";

export default ({ config }: ConfigContext): ExpoConfig => {
  const env = process.env.APP_ENV || process.env.NODE_ENV || "development";
  
  // Load the appropriate env file
  const envFile = env === "production" ? ".env.production" : ".env.development";
  dotenv.config({ path: envFile });

  // Create environment-specific configurations
  const envConfigs = {
    development: {
      kakaoRedirectUri: process.env.KAKAO_REDIRECT_URI,
      kakaoRestApiKey: process.env.KAKAO_REST_API_KEY,
      naverRedirectUri: process.env.NAVER_REDIRECT_URI,
      naverRestApiKey: process.env.NAVER_REST_API_KEY,
      baseURL: process.env.BASE_URL,
      naverMapApiKey: process.env.NAVER_MAP_CLIENT_ID,
      naverMapClientId: process.env.NAVER_MAP_CLIENT_ID,
      naverMapClientSecret: process.env.NAVER_MAP_CLIENT_SECRET,
      naverMapClientSecretKey: process.env.NAVER_MAP_CLIENT_SECRET_KEY,
    
    },
    production: {
      // Hardcode production values or load from .env.production
      kakaoRedirectUri: process.env.KAKAO_REDIRECT_URI,
      kakaoRestApiKey: process.env.KAKAO_REST_API_KEY,
      naverRedirectUri: process.env.NAVER_REDIRECT_URI,
      naverRestApiKey: process.env.NAVER_REST_API_KEY,
      baseURL: process.env.BASE_URL,
      naverMapApiKey: process.env.NAVER_MAP_CLIENT_ID,
      naverMapClientId: process.env.NAVER_MAP_CLIENT_ID,
      naverMapClientSecret: process.env.NAVER_MAP_CLIENT_SECRET,
      naverMapClientSecretKey: process.env.NAVER_MAP_CLIENT_SECRET_KEY,
    },
  };

  // Select the correct config based on environment
  const envConfig = env === "production" ? envConfigs.production : envConfigs.development;

  console.log(`Building for environment: ${env}`);
  console.log('Selected configuration:', envConfig);

  const expoConfig: ExpoConfig = {
    ...config,
    name: "찰칵의 덕후",
    slug: config.slug || "defaultSlug",
    plugins: [
      [
        "expo-splash-screen",
        {
          resizeMode: "contain",
          backgroundColor: "#F71D6A",
          image: "./src/assets/splash_image.png",
          imageStyles: {
            width: '100%',  // 화면 너비의 80%
            height: '100%', // 화면 높이의 80%
          }
        }
      ],
      // NaverMap
      [
        "@mj-studio/react-native-naver-map",
        {
          client_id: process.env.NAVER_MAP_CLIENT_ID,
          android: {
            ACCESS_FINE_LOCATION: true,
            ACCESS_COARSE_LOCATION: true,
            ACCESS_BACKGROUND_LOCATION: true
          },
          ios: {
            NSLocationAlwaysAndWhenInUseUsageDescription: "현재 위치를 기반으로 지도 기능을 사용합니다.",
            NSLocationWhenInUseUsageDescription: "현재 위치를 기반으로 지도 기능을 사용합니다.",
            NSLocationTemporaryUsageDescriptionDictionary: {
              purposeKey: "mapUsage",
              usageDescription: "지도 기반 기능 제공을 위해 위치 접근 권한이 필요합니다."
            }
          }
        }
      ],
      [
        "expo-build-properties",
        {
          android: {
            extraMavenRepos: ["https://repository.map.naver.com/archive/maven"]
          }
        }
      ]
    ],
    extra: {
      environment: env,
      ...envConfig,
      eas: {
        projectId: "267ee49b-7fdb-4c66-aa1b-f3397b8716d5"
      }
    },
    // Add this to force rebuild when env changes
    version: env === "production" ? "1.0.0-prod" : "1.0.0-dev",
  };

  return expoConfig;
};