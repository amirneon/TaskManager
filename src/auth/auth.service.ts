import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(nickName: string, password: string) {
    const user = await this.usersService.findOneByNickName(nickName);

    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { nickName: user.nickName, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
