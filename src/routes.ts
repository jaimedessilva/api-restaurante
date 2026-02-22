import { Router, Request, Response } from 'express';

const routes: Router = Router();

routes.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello from routes!' });
});

routes.get('/data', (req: Request, res: Response) => {
  const data = req.body;
  res.json({ message: 'Data received', data });
});

export default routes;