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

export const jwt = {
  SECRET_KEY: process.env.JWT_SECRET_KEY!,
};

// export const stripe = {
//   SECRET_KEY: process.env.STRIPE_SECRET_KEY!,
// };

const { SQUARE_APP_ID, SQUARE_ACCESS_TOKEN, SQUARE_API_VERSION, SQUARE_APP_NAME, SQUARE_LOCATION_ID } = process.env;

if (!SQUARE_APP_ID || !SQUARE_ACCESS_TOKEN || !SQUARE_API_VERSION || !SQUARE_APP_NAME || !SQUARE_LOCATION_ID) {
  throw new Error("Some required environment variables are undefined [database config]");
}

export const square = {
  SQUARE_APP_ID,
  SQUARE_ACCESS_TOKEN,
  SQUARE_API_VERSION,
  SQUARE_APP_NAME,
  SQUARE_LOCATION_ID,
};
