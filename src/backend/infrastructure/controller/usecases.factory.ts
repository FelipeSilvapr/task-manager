// repositories
import { ListRepository } from '../../core/repository/list.repository'
import { TaskRepository } from '../../core/repository/task.repository'

// usecases

// ## list
import { CreateListUsecase } from '../../core/usecase/list/create-list.usecase'
import { ListListsUsecase } from '../../core/usecase/list/list-lists.usecase'
import { GetListUsecase } from '../../core/usecase/list/get-list.usecase'
import { EditListUsecase } from '../../core/usecase/list/edit-list.usecase'
import { DeleteListUsecase } from '../../core/usecase/list/delete-list.usecase'
import { ArchiveListUsecase } from '../../core/usecase/list/archive-list.usecase'

// ## task
import { CreateTaskUsecase } from '../../core/usecase/task/create-task.usecase'
import { ListTasksUsecase } from '../../core/usecase/task/list-tasks.usecase'
import { EditTaskUsecase } from '../../core/usecase/task/edit-task.usecase'
import { DeleteTaskUsecase } from '../../core/usecase/task/delete-task.usecase'

const useCasesFactory = () => {
  // repositories
  const listRepository = new ListRepository()
  const taskRepository = new TaskRepository()

  // usecases
  const createTaskUsecase = new CreateTaskUsecase(taskRepository)
  const listTasksUsecase = new ListTasksUsecase(taskRepository)
  const editTaskUsecase = new EditTaskUsecase(taskRepository)
  const deleteTaskUsecase = new DeleteTaskUsecase(taskRepository)

  const listListsUsecase = new ListListsUsecase(listRepository)
  const createListUsecase = new CreateListUsecase(listRepository)
  const getListUsecase = new GetListUsecase(listRepository, listTasksUsecase)
  const editListUsecase = new EditListUsecase(listRepository)
  const deleteListUsecase = new DeleteListUsecase(listRepository)
  const archiveListUsecase = new ArchiveListUsecase(listRepository)



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
  }
}

const usecases = useCasesFactory()
export { usecases }
