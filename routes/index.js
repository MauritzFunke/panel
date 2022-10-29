import express from 'express';
import * as system_statistics from '../helpers/statistics.js';
import { bytesToSize } from '../helpers/converters.js';
import si from 'systeminformation';


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
        interfaces: (await si.networkInterfaces()),
        os: (await si.osInfo()),
        users: (await si.users()).length,
        memory: 0,
        disks: [],
        partitions: (await si.blockDevices()),
        cpu: (await si.cpu())
    };
    (await system_statistics.getDiskUsage()).forEach(disk => {
        disk = {...disk};
        disk._available = bytesToSize(disk._available*1024);
        disk._used = bytesToSize(disk._used*1024);
        disk._blocks = bytesToSize(disk._blocks*1024);
        console.log(disk);
        statistics.disks.push(disk);
    });
    statistics.memory = bytesToSize((await si.mem()).total);
    console.log(statistics);
    res.render(ROUTE_PREFIX + 'statistics', {
        statistics
    });
});

export default router;