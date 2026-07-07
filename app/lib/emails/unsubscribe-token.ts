import { createHmac } from "crypto";

const SECRET = process.env.NEXTAUTH_SECRET!;

export function generateUnsubscribeToken(email: string): string {
  return createHmac("sha256", SECRET).update(email).digest("hex");
}

export function verifyUnsubscribeToken(email: string, token: string): boolean {
  const expected = generateUnsubscribeToken(email);
  return expected === token;
}