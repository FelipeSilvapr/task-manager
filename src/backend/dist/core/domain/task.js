"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
class Task {
    _id;
    _title;
    _description;
    _status;
    _listId;
    _userId;
    constructor(id, title, description, status, listId, userId) {
        this._id = id;
        this._title = title;
        this._description = description;
        this._status = status;
        this._listId = listId;
        this._userId = userId;
    }
    get id() {
        return this._id;
    }
    get title() {
        return this._title;
    }
    get description() {
        return this._description;
    }
    get status() {
        return this._status;
    }
    get listId() {
        return this._listId;
    }
    get userId() {
        return this._userId;
    }
    set title(title) {
        if (title.length < 3) {
            throw new Error('Title must be at least 3 characters long');
        }
        if (title.length > 255) {
            throw new Error('Title must be at most 255 characters long');
        }
        this._title = title;
    }
    set description(description) {
        if (description.length > 1000) {
            throw new Error('Description must be at most 1000 characters long');
        }
        this._description = description;
    }
    set status(status) {
        if (status === 'DONE' && (this._status === 'TODO' || this._status === 'IN-PROGRESS')) {
            throw new Error(`Cannot transition from TODO to ${status} directly`);
        }
        this._status = status;
    }
    toJSON() {
        return {
            id: this._id,
            title: this._title,
            description: this._description,
            status: this._status,
            listId: this._listId,
            userId: this._userId,
        };
    }
}
exports.Task = Task;
