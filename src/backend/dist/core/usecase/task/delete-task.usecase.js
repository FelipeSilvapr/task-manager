"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTaskUsecase = void 0;
class DeleteTaskUsecase {
    taskGateway;
    constructor(taskGateway) {
        this.taskGateway = taskGateway;
    }
    async execute(input) {
        const task = await this.taskGateway.get(input.userId, input.listId, input.id);
        if (!task) {
            throw new Error('Task not found');
        }
        await this.taskGateway.delete(task);
        return {
            id: task.id,
            userId: task.userId,
            listId: task.listId,
        };
    }
}
exports.DeleteTaskUsecase = DeleteTaskUsecase;
