import { NextApiRequest, NextApiResponse } from 'next'
import { TaskService } from '@/services/taskService'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const task = TaskService.createTask(req.body)
      res.status(201).json(task)
    } catch (error) {
      res.status(500).json({ message: (error as Error).message })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
