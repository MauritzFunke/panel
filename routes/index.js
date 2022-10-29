import express from 'express';
import * as system_statistics from '../helpers/statistics.js';
import { bytesToSize, hertzToSpeed } from '../helpers/converters.js';
const router = express.Router();

const ROUTE_PREFIX = 'index/';

router.get('/', (req, res) => {
    res.render(ROUTE_PREFIX + 'index');
});

router.get('/statistics', async(req, res) => {
    /*
     - network traffic (api)
     - CPU Usage (diagram, api)
     - RAM Usage (diagram, api)
    */
    let statistics = {
        interfaces: system_statistics.getInterfaces(),
        users: (await system_statistics.getUsers()).length,
        disks: [],
        cpu: []
    };
    (await system_statistics.getDiskUsage()).forEach(disk => {
        disk = {...disk};
        disk._available = bytesToSize(disk._available*1024);
        disk._used = bytesToSize(disk._used*1024);
        disk._blocks = bytesToSize(disk._blocks*1024);
        console.log(disk);
        statistics.disks.push(disk);
    });
    system_statistics.getCPU().forEach(core => {
        core.speed = hertzToSpeed(core.speed*1000*1000);
        statistics.cpu.push(core);
    });
    res.render(ROUTE_PREFIX + 'statistics', {
        statistics
    });
});

export default router;