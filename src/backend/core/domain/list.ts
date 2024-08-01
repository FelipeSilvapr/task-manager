import { Task } from "./task";

export type ListStatus = "ACTIVE" | "ARCHIVED";

export class List {
  private _id: string;
  private _title: string;
  private _status: ListStatus;
  private _tasks: Task[] = [];
  private _userId: string;

  constructor(id: string, title: string, status: ListStatus, userId: string) {
    this._id = id;
    this._title = title;
    this._status = status;
    this._userId = userId;
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get status(): ListStatus {
    return this._status;
  }

  get tasks(): Task[] {
    return this._tasks;
  }

  get userId(): string {
    return this._userId;
  }

  set title(title: string) {
    if (title.length < 3) {
      throw new Error("Title must be at least 3 characters long");
    }

    if (title.length > 255) {
      throw new Error("Title must be at most 255 characters long");
    }

    this._title = title;
  }

  set status(status: ListStatus) {
    this._status = status;
  }

  set tasks(tasks: Task[]) {
    this._tasks = tasks;
  }

  addTask(task: Task) {
    if (this._tasks.some((t) => t.id === task.id)) {
      throw new Error("Task already in list");
    }

    this._tasks.push(task);
  }

  removeTask(task: Task) {
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
      tasks: this._tasks.map((task) => task.toJSON()),
      userId: this._userId
    };
  }
}