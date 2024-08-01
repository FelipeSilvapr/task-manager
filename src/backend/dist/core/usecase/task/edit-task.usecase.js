"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditTaskUsecase = void 0;
class EditTaskUsecase {
    taskGateway;
    constructor(taskGateway) {
        this.taskGateway = taskGateway;
    }
    async execute(input) {
        const task = await this.taskGateway.get(input.userId, input.listId, input.id);
        if (!task) {
            throw new Error('Task not found');
        }
        if (input.title) {
            task.title = input.title;
        }
        if (input.description) {
            task.description = input.description;
        }
        if (input.status) {
            task.status = input.status;
        }
        await this.taskGateway.update(task);
        return {
            id: task.id,
            title: task.title,
            description: task.description,
            status: task.status,
            userId: task.userId,
            listId: task.listId,
        };
    }
}
exports.EditTaskUsecase = EditTaskUsecase;
