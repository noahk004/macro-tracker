import { randomBytes, pbkdf2Sync } from "crypto";

export function generateSalt(length: number = 32): string {
  return randomBytes(length).toString("hex");
}

export function hash(password: string, salt: string): string {
  const hash = pbkdf2Sync(password, salt, 1000, 64, `sha256`).toString(`hex`);
  return hash;
}

