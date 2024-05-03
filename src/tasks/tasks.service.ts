import { Injectable } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Task } from "./entities/task.entity";
import { TaskLinkedToUserDto } from "./dto/task-linked-to-user.dto";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>
  ) {}

  async create(taskLinkedToUserDto: TaskLinkedToUserDto) {
    const task = this.taskRepository.create(taskLinkedToUserDto);
    await this.taskRepository.save(taskLinkedToUserDto);
    return { title: task.title, description: task.description };
  }

  async findAllByAdmin() {
    return await this.taskRepository.find({
      relations: {
        user: true,
      },
    });
  }

  async findAllByUser(userId: string) {
    return await this.taskRepository
      .createQueryBuilder("task")
      .where("task.userId = :userId", { userId })
      .getMany();
  }

  async findOne(title: string, userId: string) {
    const task = await this.taskRepository.findOneBy({ title, userId });
    return task;
  }

  async update(title: string, userId: string, updateTaskDto: UpdateTaskDto) {
    const taskToUpdate = await this.taskRepository.findOneBy({ title, userId });
    // taskToUpdate = { taskToUpdate, ...updateTaskDto };  //doesnt work cause it seems that taskToUpdate is a constant!
    updateTaskDto.title ? (taskToUpdate.title = updateTaskDto.title) : null;
    updateTaskDto.links ? (taskToUpdate.links = updateTaskDto.links) : null;
    updateTaskDto.description
      ? (taskToUpdate.description = updateTaskDto.description)
      : null;

    await this.taskRepository.save(taskToUpdate);
    return taskToUpdate;
  }

  async remove(title: string, userId: string) {
    const taskToRemove = await this.taskRepository.findOneBy({ title, userId });
    await this.taskRepository.remove(taskToRemove);
    return "Done!";
  }
}
