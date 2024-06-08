import { DatabaseService } from './databaseService'

export class ListService {
  static createList(listData: any) {
    const data = DatabaseService.getData()
    const nextListId = `L${1 + Number(data.lastListId.slice(1))}`
    const list = { listId: nextListId, ...listData }
    data.lists.push(list)
    data.lastListId = nextListId
    DatabaseService.setData(data)
    return list
  }

  static retrieveList(listId: string) {
    const data = DatabaseService.getData()
    return data.lists.find((list: any) => list.listId === listId)
  }

  static updateList(listId: string, listData: any) {
    const data = DatabaseService.getData()
    const listIndex = data.lists.findIndex((list: any) => list.listId === listId)
    if (listIndex === -1) throw new Error('List not found')
    data.lists[listIndex] = { ...data.lists[listIndex], ...listData }
    DatabaseService.setData(data)
    return data.lists[listIndex]
  }

  static deleteList(listId: string) {
    const data = DatabaseService.getData()
    data.lists = data.lists.filter((list: any) => list.listId !== listId)
    DatabaseService.setData(data)
  }

  static completeList(listId: string) {
    const data = DatabaseService.getData()
    const listIndex = data.lists.findIndex((list: any) => list.listId === listId)
    if (listIndex === -1) throw new Error('List not found')
    data.lists[listIndex].isComplete = true
    DatabaseService.setData(data)
    return data.lists[listIndex]
  }
}
