import { SignOptions } from "jsonwebtoken";
import * as jwt from "jsonwebtoken";


export function signJwt(payload: any, secret: string, options: SignOptions): string {
    return jwt.sign(payload, secret, options);
}