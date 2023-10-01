declare namespace NodeJS {
  interface ProcessEnv {
    SECRET_KEY: string;
    GUEST_SECRET_NAME: string;
    GUEST_SECRET_EMAIL: string;
    GUEST_SECRET_PASSWORD: string;
    GUEST_TOKEN: string;
    API_ENDPOINT: string;
    PORT: string;
    DB_HOST: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    DB_TABLE_NAME_1: string;
    DB_TABLE_NAME_2: string;
  }
}
