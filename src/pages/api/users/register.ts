import { NextApiRequest, NextApiResponse } from 'next'
import { UserService } from '@/services/userService'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const user = UserService.createUser(req.body)
      res.status(201).json(user)
    } catch (error) {
      res.status(500).json({ message: (error as Error).message })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
