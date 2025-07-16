import { Router } from 'express';
import coursesData from '../data/courses.json';

const router = Router();

router.get('/', (req, res) => {
  return res.status(200).json(coursesData);
});

export default router;
