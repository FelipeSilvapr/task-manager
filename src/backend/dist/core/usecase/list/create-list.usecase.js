"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateListUsecase = void 0;
const uuid_1 = require("uuid");
const list_1 = require("../../domain/list");
class CreateListUsecase {
    listGateway;
    constructor(listGateway) {
        this.listGateway = listGateway;
    }
    async execute(input) {
        const list = new list_1.List((0, uuid_1.v4)(), input.title, "ACTIVE", input.userId);
        const createdList = await this.listGateway.create(list);
        return {
            id: createdList.id,
            title: createdList.title,
            status: createdList.status,
            userId: createdList.userId,
        };
    }
}
exports.CreateListUsecase = CreateListUsecase;
