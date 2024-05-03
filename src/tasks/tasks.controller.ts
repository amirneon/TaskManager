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
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Request } from "express";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Req() req: Request, @Body() createTaskDto: CreateTaskDto) {
    const taskLinkedToUser = { ...createTaskDto, userId: req["user"].sub };
    return this.tasksService.create(taskLinkedToUser);
  }

  @Get("findAllByAdmin")
  findAllAdmin() {
    return this.tasksService.findAllByAdmin();
  }

  @Get("all")
  findAllByUser(@Req() req: Request) {
    return this.tasksService.findAllByUser(req["user"].sub);
  }

  @Get(":title")
  findOne(@Req() req: Request, @Param("title") title: string) {
    return this.tasksService.findOne(title, req["user"].sub);
  }

  @Put(":title")
  update(
    @Req() req: Request,
    @Param("title") title: string,
    @Body() updateTaskDto: UpdateTaskDto
  ) {
    return this.tasksService.update(title, req["user"].sub, updateTaskDto);
  }

  @Delete(":title")
  remove(@Req() req: Request, @Param("title") title: string) {
    return this.tasksService.remove(title, req["user"].sub);
  }
}
