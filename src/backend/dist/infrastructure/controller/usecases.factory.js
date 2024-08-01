"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usecases = void 0;
// repositories
const list_repository_1 = require("../../core/repository/list.repository");
const task_repository_1 = require("../../core/repository/task.repository");
// usecases
// ## list
const create_list_usecase_1 = require("../../core/usecase/list/create-list.usecase");
const list_lists_usecase_1 = require("../../core/usecase/list/list-lists.usecase");
const get_list_usecase_1 = require("../../core/usecase/list/get-list.usecase");
const edit_list_usecase_1 = require("../../core/usecase/list/edit-list.usecase");
const delete_list_usecase_1 = require("../../core/usecase/list/delete-list.usecase");
const archive_list_usecase_1 = require("../../core/usecase/list/archive-list.usecase");
// ## task
const create_task_usecase_1 = require("../../core/usecase/task/create-task.usecase");
const list_tasks_usecase_1 = require("../../core/usecase/task/list-tasks.usecase");
const edit_task_usecase_1 = require("../../core/usecase/task/edit-task.usecase");
const delete_task_usecase_1 = require("../../core/usecase/task/delete-task.usecase");
const useCasesFactory = () => {
    // repositories
    const listRepository = new list_repository_1.ListRepository();
    const taskRepository = new task_repository_1.TaskRepository();
    // usecases
    const listListsUsecase = new list_lists_usecase_1.ListListsUsecase(listRepository);
    const createListUsecase = new create_list_usecase_1.CreateListUsecase(listRepository);
    const getListUsecase = new get_list_usecase_1.GetListUsecase(listRepository);
    const editListUsecase = new edit_list_usecase_1.EditListUsecase(listRepository);
    const deleteListUsecase = new delete_list_usecase_1.DeleteListUsecase(listRepository);
    const archiveListUsecase = new archive_list_usecase_1.ArchiveListUsecase(listRepository);
    const createTaskUsecase = new create_task_usecase_1.CreateTaskUsecase(taskRepository);
    const listTasksUsecase = new list_tasks_usecase_1.ListTasksUsecase(taskRepository);
    const editTaskUsecase = new edit_task_usecase_1.EditTaskUsecase(taskRepository);
    const deleteTaskUsecase = new delete_task_usecase_1.DeleteTaskUsecase(taskRepository);
    return {
        listListsUsecase,
        createListUsecase,
        getListUsecase,
        editListUsecase,
        deleteListUsecase,
        archiveListUsecase,
        createTaskUsecase,
        listTasksUsecase,
        editTaskUsecase,
        deleteTaskUsecase,
    };
};
const usecases = useCasesFactory();
exports.usecases = usecases;
