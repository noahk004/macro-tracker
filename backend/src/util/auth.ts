import { randomBytes, pbkdf2Sync } from "crypto";
import dotenv from "dotenv";

import { sign, verify } from "jsonwebtoken";

dotenv.config();

export function generateSalt(length: number = 32): string {
  return randomBytes(length).toString("hex");
}

export function hash(password: string, salt: string): string {
  const hash = pbkdf2Sync(password, salt, 1000, 64, `sha256`).toString(`hex`);
  return hash;
}

export function generateToken(userId: number, username: string) {
  if (!process.env.SECRET_KEY) {
    throw new Error("SECRET_KEY is not defined in environment variables.");
  }

  const payload = {
    userId: userId,
    username: username,
  };

  const token = sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" });

  return token;
}

export function validateToken(token: string) {
  if (!process.env.SECRET_KEY) {
    throw new Error("SECRET_KEY is not defined in environment variables.");
  }

  try {
    const decoded = verify(token, process.env.SECRET_KEY);
    return decoded;
  } catch (error) {
    console.log("Invalid token:", error);
    return null;
  }
}