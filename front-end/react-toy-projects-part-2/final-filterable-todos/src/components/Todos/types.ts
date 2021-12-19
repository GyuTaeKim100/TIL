import { todoStatusEnum, todoPriorityEnum } from '../Todos/enums'

export type TTodoData = {
  todoStatus: todoStatusEnum
  content: string
  priority: todoPriorityEnum
  upsertDate?: any // TODO : dayjs Type으로 재정의 필요
  id: number
}

export type TInsertFormFieldsValue = {
  priority: todoPriorityEnum
  content: string
}

export type TFilterTodosRules = {
  prioritySet: Set<todoPriorityEnum>
  statusSet: Set<todoStatusEnum>
}
