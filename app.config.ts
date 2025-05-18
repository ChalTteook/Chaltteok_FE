import { ExpoConfig, ConfigContext } from "@expo/config";
import * as dotenv from "dotenv";

export default ({ config }: ConfigContext): ExpoConfig => {
  const env = process.env.APP_ENV || process.env.NODE_ENV || "development";
  console.log("Current environment:", env);
  
  // EAS 빌드 시에는 .env 파일 로드를 건너뛰기
  if (!process.env.EAS_BUILD) {
    const envFile = env === "production" ? ".env.production" : ".env.development";
    console.log(`Loading environment from ${envFile}`);
    dotenv.config({ path: envFile });
  }

  // Create environment-specific configurations
  const envConfigs = {
    development: {
      kakaoRedirectUri: "http://43.201.211.39/",
      kakaoRestApiKey: "fe0e720fbe5b74240985fb33256f2826",
      naverRedirectUri: "http://43.201.211.39/",
      naverRestApiKey: "GK2ORFcjWGkcsqlGPh8M",
      baseURL: "http://43.201.211.39/api/v1",
    },
    production: {
      // Hardcoded production values
      kakaoRedirectUri: "https://chaltteok.com",
      kakaoRestApiKey: "fe0e720fbe5b74240985fb33256f2826",
      naverRedirectUri: "https://chaltteok.com",
      naverRestApiKey: "GK2ORFcjWGkcsqlGPh8M",
      baseURL: "https://chaltteok.com/api/v1",
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
            width: '100%',  // 화면 너비의 100%
            height: '100%', // 화면 높이의 100%
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
    scheme: "myapp"
  };

  return expoConfig;
};    