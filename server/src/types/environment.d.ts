/* eslint-disable */
export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      NODE_ENV: 'development' | 'production';
      TOKEN_SECRET: string;
      BASE_URL: string;
      API_BASE_URL: string;
      REFRESH_TOKEN_SECRET: string;
      DISCORD_CLIENT_ID: string;
      DISCORD_CLIENT_SECRET: string;
    }
  }
}
