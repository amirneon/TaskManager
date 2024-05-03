import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";

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

  async findAll() {
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

  async remove(nickName: string) {
    const userToRemove = await this.userRepository.findOneBy({ nickName });
    await this.userRepository.remove(userToRemove);
    return "Done!";
  }
}
