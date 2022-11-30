import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";

const jwt = require("jsonwebtoken");

const config = process.env;

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  use(request: Request, response: Response, next: NextFunction): void {
    const verifyToken = (req, res, next) => {
      const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

      if (!token) {
        return res.status(403).json({ message: "A token is required for authentication" });
      }
      try {
        const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
        req.user = decoded;
      } catch (err) {
        return res.status(401).json({ message: "Unauthorized access" });
      }
      return next();
    }

  }
}