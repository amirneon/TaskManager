import { Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request, Response, NextFunction } from "express";
import { SECRET_KEY } from "src/common/constants/auth.constants";

@Injectable()
export class RoleCheck implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers?.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).send("You need to Login first!");
      }

      const payload = await this.jwtService.verifyAsync(token, {
        secret: SECRET_KEY,
      });

      if (payload.role == "user") {
        return res.status(403).send("Only admins can access this part!");
      } else {
        next();
      }
    } catch (error) {
      return res.send({
        msg: error,
      });
    }
  }
}
