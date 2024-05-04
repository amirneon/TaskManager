import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User, UserRole } from "./entities/user.entity";
import { Repository } from "typeorm";
import { UpdateUserByAdminDto } from "./dto/update-user-byAdmin.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(createUserDto);
    return user;
  }

  async findAllByAdmin() {
    return await this.userRepository.find();
  }

  async findOneByNickName(nickName: string) {
    const user = await this.userRepository.findOneBy({ nickName });
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userToUpdate = await this.userRepository.findOneBy({
      id,
    });
    // userToUpdate = { userToUpdate, ...updateUserDto };  //doesnt work cause it seems that userToUpdate is a constant!
    updateUserDto.password
      ? (userToUpdate.password = updateUserDto.password)
      : null;

    updateUserDto.email ? (userToUpdate.email = updateUserDto.email) : null;

    updateUserDto.phoneNumber
      ? (userToUpdate.phoneNumber = updateUserDto.phoneNumber)
      : null;

    await this.userRepository.save(userToUpdate);
    return userToUpdate;
  }

  async updateByAdmin(
    nickName: string,
    UpdateUserByAdminDto: UpdateUserByAdminDto
  ) {
    const userToUpdate = await this.userRepository.findOneBy({ nickName });
    // userToUpdate = { userToUpdate, ...UpdateUserByAdminDto };  //doesnt work cause it seems that userToUpdate is a constant!

    UpdateUserByAdminDto.nickName
      ? (userToUpdate.nickName = UpdateUserByAdminDto.nickName)
      : null;

    UpdateUserByAdminDto.password
      ? (userToUpdate.password = UpdateUserByAdminDto.password)
      : null;

    UpdateUserByAdminDto.email
      ? (userToUpdate.email = UpdateUserByAdminDto.email)
      : null;

    UpdateUserByAdminDto.phoneNumber
      ? (userToUpdate.phoneNumber = UpdateUserByAdminDto.phoneNumber)
      : null;

    await this.userRepository.save(userToUpdate);
    return userToUpdate;
  }

  async deleteUserByAdmin(nickName: string) {
    const userToRemove = await this.userRepository.findOneBy({ nickName });
    await this.userRepository.remove(userToRemove);
    return "Done!";
  }

  async giveRoleByAdmin(nickName: string, role: UserRole) {
    const userToGiveRole = await this.userRepository.findOneBy({ nickName });
    if (role !== "admin" && role !== "user") {
      return "Role must be Admin or User!";
    } else {
      userToGiveRole.role = role;
      await this.userRepository.save(userToGiveRole);
    }
    return userToGiveRole;
  }
}
