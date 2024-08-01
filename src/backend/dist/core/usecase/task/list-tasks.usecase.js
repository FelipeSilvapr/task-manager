"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListTasksUsecase = void 0;
class ListTasksUsecase {
    taskGateway;
    constructor(taskGateway) {
        this.taskGateway = taskGateway;
    }
    async execute(input) {
        const tasks = await this.taskGateway.list(input.userId, input.listId);
        return {
            tasks,
        };
    }
}
exports.ListTasksUsecase = ListTasksUsecase;
