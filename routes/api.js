import express from 'express';
import cpu from '../api/cpu.js';
import ram from '../api/ram.js';
import cors from 'cors';
const router = express.Router();

router.use(cors());

router.use('/cpu', cpu);
router.use('/ram', ram);

export default router;