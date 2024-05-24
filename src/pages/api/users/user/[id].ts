import { NextApiRequest, NextApiResponse } from 'next';
import { UserService } from '@/services/userService';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      try {
        const user = UserService.retrieveUser(id as string);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
      } catch (error) {
        res.status(500).json({ message: (error as Error).message });
      }
      break;
    case 'PUT':
      try {
        const updatedUser = UserService.updateUser(id as string, req.body);
        res.json(updatedUser);
      } catch (error) {
        res.status(500).json({ message: (error as Error).message });
      }
      break;
    case 'DELETE':
      try {
        UserService.deleteUser(id as string);
        res.json({ message: 'User deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: (error as Error).message });
      }
      break;
    default:
      res.status(405).json({ message: 'Method not allowed' });
  }
}
