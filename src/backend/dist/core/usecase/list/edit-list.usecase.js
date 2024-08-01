"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditListUsecase = void 0;
class EditListUsecase {
    listGateway;
    constructor(listGateway) {
        this.listGateway = listGateway;
    }
    async execute(input) {
        const list = await this.listGateway.get(input.userId, input.id);
        if (!list) {
            throw new Error("List not found");
        }
        list.title = input.title;
        await this.listGateway.update(list);
        return {
            id: list.id,
            title: list.title,
            userId: list.userId,
        };
    }
}
exports.EditListUsecase = EditListUsecase;
