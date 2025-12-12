import jwt, { JwtPayload } from "jsonwebtoken";


const JWT_SECRET = "Ajiudb69juhbz,097hi23hjrb56lk3h1";

export class AuthApplication {
  static generateToken(payload: object): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "2h" }); // HU02: token expira en 2h
  }

  static verifyToken(token: string): string | JwtPayload {
    return jwt.verify(token, JWT_SECRET);
  }
}