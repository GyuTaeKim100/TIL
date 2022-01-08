import { Status, Priority } from './enums'

// todo 관련 목록
export type TTodo = {
  status: Status
  content: string
  priority: Priority
  createdAt: any // TODO : dayjs Type으로 재정의 필요
  updatedAt: any // TODO : dayjs Type으로 재정의 필요
  id: number
}

export type TTodos = Array<TTodo>

//filter options 관련  목록
export type TCheckTypeItem = {
  key: Status | Priority
  content: any
  active: boolean
}

export type TCheckTypeItems = Array<TCheckTypeItem>

export type TTodosFilterOptions = {
  priorities: TCheckTypeItems
  statuses: TCheckTypeItems
}

// event props 관련 목록
export type THandleInsertProps = {
  priority: Priority
  content: string
}

export type THandleFilterProps = {
  type: string | number
  payload: {
    filterOptionName: string
    key?: string | number
  }
}
