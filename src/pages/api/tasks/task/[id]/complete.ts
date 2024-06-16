import { NextApiRequest, NextApiResponse } from 'next'
import { TaskService } from '@/services/taskService'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (req.method === 'PATCH') {
    try {
      const task = TaskService.completeTask(id as string)
      res.json(task)
    } catch (error: any) {
      if (error.message === 'Not Found') res.status(404).json({ message: 'Task not found' })
      res.status(500).json({ message: (error as Error).message })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
