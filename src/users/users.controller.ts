import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  Put,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Request } from "express";
import { Public } from "src/common/decorators/public.decorators";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":nickName")
  findOne(@Param("nickName") nickName: string) {
    return this.usersService.findOneByNickName(nickName);
  }

  @Put("update")
  update(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req["user"].sub, updateUserDto);
  }

  @Delete()
  remove(@Body("nickName") nickName: string) {
    return this.usersService.remove(nickName);
  }
}
