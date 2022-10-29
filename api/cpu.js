/**
 *  @swagger
 *  /cpu:
 *      get:
 *          summary: Gets information about the cpu
 *          description: Returns the current information about the current state of the cpu
 *                      such as load, speed, temperature, 
 *          responses:
 *              '200':
 *                  description: Successful operation
 *
 */
import express from 'express';
import si from 'systeminformation';

const router = express.Router();

router.get('/', async (req, res) => {
    let cpu = {};
    cpu['speed'] = await si.cpuCurrentSpeed();
    cpu['load'] = await si.currentLoad();
    cpu['temperature'] = await si.cpuTemperature();
    res.json(cpu);
});



export default router;