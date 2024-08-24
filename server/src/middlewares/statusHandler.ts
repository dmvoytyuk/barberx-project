import { Request, Response } from 'express';

export const statusHandler = (_: Request, res: Response) => {
  res.status(200).send('Server is running');
};
