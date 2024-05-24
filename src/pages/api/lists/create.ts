import { NextApiRequest, NextApiResponse } from 'next';
import { ListService } from '@/services/listService';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const newList = ListService.createList(req.body);
      res.status(201).json(newList);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
