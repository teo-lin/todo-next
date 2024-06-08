import { NextApiRequest, NextApiResponse } from 'next'
import { ListService } from '@/services/listService'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  switch (req.method) {
    case 'GET':
      try {
        const list = ListService.retrieveList(id as string)
        if (!list) return res.status(404).json({ message: 'List not found' })
        res.json(list)
      } catch (error) {
        res.status(500).json({ message: (error as Error).message })
      }
      break
    case 'PUT':
      try {
        const list = ListService.updateList(id as string, req.body)
        res.json(list)
      } catch (error) {
        res.status(500).json({ message: (error as Error).message })
      }
      break
    case 'DELETE':
      try {
        ListService.deleteList(id as string)
        res.json({ message: 'List deleted successfully' })
      } catch (error) {
        res.status(500).json({ message: (error as Error).message })
      }
      break
    default:
      res.status(405).json({ message: 'Method not allowed' })
  }
}
