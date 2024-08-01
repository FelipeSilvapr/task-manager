"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArchiveListUsecase = void 0;
class ArchiveListUsecase {
    listGateway;
    constructor(listGateway) {
        this.listGateway = listGateway;
    }
    async execute(input) {
        const list = await this.listGateway.get(input.userId, input.id);
        if (!list) {
            throw new Error("List not found");
        }
        list.archive();
        await this.listGateway.update(list);
        return {
            id: list.id,
            status: list.status,
            userId: list.userId,
        };
    }
}
exports.ArchiveListUsecase = ArchiveListUsecase;
