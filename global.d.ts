declare namespace NodeJS {
  interface ProcessEnv {
    SECRET_KEY: string;
    PORT: string;
    DB_HOST: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    DB_TABLE_NAME_1: string;
    DB_TABLE_NAME_2: string;
  }
}
