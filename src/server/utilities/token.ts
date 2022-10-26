import * as jwt from "jsonwebtoken";
import { Payload } from "../types";
import { jwt as JWTConfig } from "../config";

const signToken = (payload: Payload) => {
  const token = jwt.sign(payload, JWTConfig.SECRET_KEY, { expiresIn: "15d" });
  return token;
};

const verifyToken = (token: string) => {
  const payload = jwt.verify(token, JWTConfig.SECRET_KEY) as Payload;
  return payload;
};

export default { signToken, verifyToken };
