import { NextApiRequest, NextApiResponse } from 'next'
import { TaskService } from '@/services/taskService'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  switch (req.method) {
    case 'GET':
      try {
        const task = TaskService.retrieveTask(id as string)
        if (!task) return res.status(404).json({ message: 'Task not found' })
        res.json(task)
      } catch (error) {
        res.status(500).json({ message: (error as Error).message })
      }
      break
    case 'PUT':
      try {
        const task = TaskService.updateTask(id as string, req.body)
        res.json(task)
      } catch (error) {
        res.status(500).json({ message: (error as Error).message })
      }
      break
    case 'DELETE':
      try {
        TaskService.deleteTask(id as string)
        res.json({ message: 'Task deleted successfully' })
      } catch (error) {
        res.status(500).json({ message: (error as Error).message })
      }
      break
    default:
      res.status(405).json({ message: 'Method not allowed' })
  }
}
