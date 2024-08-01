"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteListUsecase = void 0;
class DeleteListUsecase {
    listGateway;
    constructor(listGateway) {
        this.listGateway = listGateway;
    }
    async execute(input) {
        const list = await this.listGateway.get(input.userId, input.id);
        if (!list) {
            throw new Error("List not found");
        }
        await this.listGateway.delete(list);
        return {
            id: input.id,
            userId: input.userId,
        };
    }
}
exports.DeleteListUsecase = DeleteListUsecase;
