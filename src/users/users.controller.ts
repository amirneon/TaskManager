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
import { UpdateUserByAdminDto } from "./dto/update-user-byAdmin.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get("findAllByAdmin")
  findAll() {
    return this.usersService.findAllByAdmin();
  }

  @Get(":nickName")
  findOne(@Param("nickName") nickName: string) {
    return this.usersService.findOneByNickName(nickName);
  }

  @Put("update")
  update(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req["user"].sub, updateUserDto);
  }

  @Delete("deleteUserByAdmin")
  deleteUserByAdmin(@Body("nickName") nickName: string) {
    return this.usersService.deleteUserByAdmin(nickName);
  }

  @Put("giveRoleByAdmin")
  giveRole(@Body() body) {
    return this.usersService.giveRoleByAdmin(body.nickName, body.role);
  }

  @Put("updateByAdmin/:nickName")
  updateByAdmin(
    @Param("nickName") nickName: string,
    @Body() UpdateUserByAdminDto: UpdateUserByAdminDto
  ) {
    return this.usersService.updateByAdmin(nickName, UpdateUserByAdminDto);
  }
}
