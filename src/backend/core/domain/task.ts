
export type TaskStatus = 'TODO' | 'IN-PROGRESS' | 'DONE';

export class Task {
  private _id: string;
  private _title: string;
  private _description: string;
  private _status: TaskStatus;
  private _listId: string;
  private _userId: string;

  constructor(id: string, title: string, description: string, status: TaskStatus, listId: string, userId: string) {
    this._id = id;
    this._title = title;
    this._description = description;
    this._status = status;
    this._listId = listId;
    this._userId = userId;
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get status(): TaskStatus {
    return this._status;
  }

  get listId(): string {
    return this._listId;
  }

  get userId(): string {
    return this._userId;
  }

  set title(title: string) {
    if (title.length < 3) {
      throw new Error('Title must be at least 3 characters long');
    }

    if (title.length > 255) {
      throw new Error('Title must be at most 255 characters long');
    }

    this._title = title;
  }

  set description(description: string) {
    if (description.length > 1000) {
      throw new Error('Description must be at most 1000 characters long');
    }

    this._description = description;
  }

  set status(status: TaskStatus) {
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