import express from 'express';
const router = express.Router();

const ROUTE_PREFIX = 'index/';

router.get('/', (req, res) => {
    res.render(ROUTE_PREFIX + 'index');
});

export default router;