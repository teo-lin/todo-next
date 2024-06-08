import { DatabaseService } from './databaseService'

export class UserService {
  static createUser(userData: any) {
    const data = DatabaseService.getData()
    const nextUserId = `U${1 + Number(data.lastUserId.slice(1))}`
    const user = { userId: nextUserId, ...userData }
    data.users.push(user)
    data.lastUserId = nextUserId
    DatabaseService.setData(data)
    delete user.password
    return user
  }

  static retrieveUser(userId: string) {
    const data = DatabaseService.getData()
    const user = data.users.find((user: any) => user.userId === userId)
    if (user) delete user.password
    return user
  }

  static updateUser(userId: string, userData: any) {
    const data = DatabaseService.getData()
    const userIndex = data.users.findIndex((user: any) => user.userId === userId)
    if (userIndex === -1) throw new Error('User not found')
    data.users[userIndex] = { ...data.users[userIndex], ...userData }
    DatabaseService.setData(data)
    const user = data.users[userIndex]
    delete user.password
    return user
  }

  static deleteUser(userId: string) {
    const data = DatabaseService.getData()
    data.users = data.users.filter((user: any) => user.userId !== userId)
    DatabaseService.setData(data)
  }
}
