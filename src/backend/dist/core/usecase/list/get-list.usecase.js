"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetListUsecase = void 0;
class GetListUsecase {
    listGateway;
    constructor(listGateway) {
        this.listGateway = listGateway;
    }
    async execute(input) {
        const list = await this.listGateway.get(input.userId, input.id);
        if (!list) {
            throw new Error("List not found");
        }
        return list;
    }
}
exports.GetListUsecase = GetListUsecase;
