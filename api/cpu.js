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
    let datestring = '';
    let currDate = new Date(Date.now());
    datestring = ('0'+currDate.getHours()).slice(-2) + ':' + ('0'+currDate.getMinutes()).slice(-2) + ':' + ('0'+currDate.getSeconds()).slice(-2);
    cpu['speed'] = await si.cpuCurrentSpeed();
    cpu['load'] = await si.currentLoad();
    cpu['temperature'] = await si.cpuTemperature();
    cpu['time'] = datestring;
    res.json(cpu);
});



export default router;