"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListListsUsecase = void 0;
class ListListsUsecase {
    listGateway;
    constructor(listGateway) {
        this.listGateway = listGateway;
    }
    async execute(input) {
        const lists = await this.listGateway.list(input.userId);
        return {
            lists,
        };
    }
}
exports.ListListsUsecase = ListListsUsecase;
