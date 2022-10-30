/**
 *  @swagger
 *  /ram:
 *      get:
 *          summary: Gets information about the ram
 *          description: Returns the current information about the current state of the cpu
 *                      such as load
 *          responses:
 *              '200':
 *                  description: Successful operation
 *
 */
import express from 'express';
import si from 'systeminformation';
import { bytesToSize } from '../helpers/converters.js';

const router = express.Router();

router.get('/', async (req, res) => {
    let ram = {};
    let datestring = '';
    let currDate = new Date(Date.now());
    datestring = ('0'+currDate.getHours()).slice(-2) + ':' + ('0'+currDate.getMinutes()).slice(-2) + ':' + ('0'+currDate.getSeconds()).slice(-2);
    ram['load'] = await si.mem();
    ram['load'].total = bytesToSize(ram['load'].total, 'MB', false);
    ram['load'].free = bytesToSize(ram['load'].free, 'MB', false);
    ram['load'].used = bytesToSize(ram['load'].used, 'MB', false);
    ram['time'] = datestring;
    res.json(ram);
});



export default router;