import * as dotenv from "dotenv";

dotenv.config();

export const sqlConfig = {
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  host: process.env.DB_HOST!,
  database: process.env.DB_DATABASE!,
};

export const S3Config = {
  AccessKeyID: process.env.ACCESS_KEY_ID!,
  SecretKey: process.env.SECRET_KEY!,
};
