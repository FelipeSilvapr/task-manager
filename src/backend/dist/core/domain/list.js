"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
class List {
    _id;
    _title;
    _status;
    _tasks = [];
    _userId;
    constructor(id, title, status, userId) {
        this._id = id;
        this._title = title;
        this._status = status;
        this._userId = userId;
    }
    get id() {
        return this._id;
    }
    get title() {
        return this._title;
    }
    get status() {
        return this._status;
    }
    get tasks() {
        return this._tasks;
    }
    get userId() {
        return this._userId;
    }
    set title(title) {
        if (title.length < 3) {
            throw new Error("Title must be at least 3 characters long");
        }
        if (title.length > 255) {
            throw new Error("Title must be at most 255 characters long");
        }
        this._title = title;
    }
    set status(status) {
        this._status = status;
    }
    addTask(task) {
        if (this._tasks.some((t) => t.id === task.id)) {
            throw new Error("Task already in list");
        }
        this._tasks.push(task);
    }
    removeTask(task) {
        const index = this._tasks.findIndex((t) => t.id === task.id);
        if (index === -1) {
            throw new Error("Task not found in list");
        }
        this._tasks.splice(index, 1);
    }
    archive() {
        if (this._status === "ARCHIVED") {
            throw new Error("List already archived");
        }
        if (this._tasks.some((t) => t.status === "IN-PROGRESS" || t.status === "TODO")) {
            throw new Error("List has active tasks");
        }
        this._status = "ARCHIVED";
    }
    toJSON() {
        return {
            id: this._id,
            title: this._title,
            status: this._status,
            tasks: this._tasks,
            userId: this._userId
        };
    }
}
exports.List = List;
