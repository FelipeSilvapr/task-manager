"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTaskUsecase = void 0;
const uuid_1 = require("uuid");
const task_1 = require("../../domain/task");
class CreateTaskUsecase {
    taskGateway;
    constructor(taskGateway) {
        this.taskGateway = taskGateway;
    }
    async execute(input) {
        const task = new task_1.Task((0, uuid_1.v4)(), input.title, input.description, "TODO", input.listId, input.userId);
        const createdTask = await this.taskGateway.create(task);
        return {
            id: createdTask.id,
            title: createdTask.title,
            description: createdTask.description,
            status: createdTask.status,
            userId: createdTask.userId,
            listId: createdTask.listId,
        };
    }
}
exports.CreateTaskUsecase = CreateTaskUsecase;
