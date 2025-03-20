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
    },
    production: {
      // Hardcode production values or load from .env.production
      kakaoRedirectUri: process.env.KAKAO_REDIRECT_URI,
      kakaoRestApiKey: process.env.KAKAO_REST_API_KEY,
      naverRedirectUri: process.env.NAVER_REDIRECT_URI,
      naverRestApiKey: process.env.NAVER_REST_API_KEY,
      baseURL: process.env.BASE_URL,
    },
  };

  // Select the correct config based on environment
  const envConfig = env === "production" ? envConfigs.production : envConfigs.development;

  console.log(`Building for environment: ${env}`);
  console.log('Selected configuration:', envConfig);

  const expoConfig: ExpoConfig = {
    ...config,
    name: config.name || "defaultName",
    slug: config.slug || "defaultSlug",
    plugins: [
      [
        "expo-splash-screen",
        {
          resizeMode: "contain",
          backgroundColor: "#F71D6A",
          image: "./src/assets/splash_image.png",
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