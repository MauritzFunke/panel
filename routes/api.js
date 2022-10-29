import express from 'express';
import cpu from '../api/cpu.js';
import cors from 'cors';
const router = express.Router();

router.use(cors());

router.use('/cpu', cpu);

export default router;