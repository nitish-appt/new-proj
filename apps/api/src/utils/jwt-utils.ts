import jwt from "jsonwebtoken";
import constants from "../constants.js";
import { Maybe } from "../types.js";
import { config, messages } from "../utils/index.js";

export function createToken(email: string): Maybe<string> {
  if (email) {
    const accessToken: string = jwt.sign(
      { email: email },
      config.sessionSecret,
      {
        expiresIn: constants.EXPIRES_IN,
      }
    );

    if (accessToken) {
      return accessToken;
    }
  }
}

export function verifyJwt(token: string): Maybe<string | jwt.JwtPayload> {
  const accessToken: string = token.split(" ")[1];

  if (!accessToken) {
    throw new Error(messages.UNAUTHORISED_ERR_MSG);
  }

  const data: string | jwt.JwtPayload = jwt.verify(
    accessToken,
    config.sessionSecret
  );

  if (data) {
    return data;
  }
}
