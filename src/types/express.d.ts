import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    // Extend the Request interface
    interface Request {
      user?: JwtPayload; // Optional custom property
    }
  }
}