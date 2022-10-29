import os from 'os';
import { createRequire } from 'module';
import util from 'node:util';
const require = createRequire(import.meta.url);
const exec = util.promisify(require('node:child_process').exec);

import nodeDiskInfo from 'node-disk-info';

export function getInterfaces() {
    const nets = os.networkInterfaces();
    let results = {};
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
            // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
            const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4;
            if (net.family === familyV4Value && !net.internal) {
                if (!results[name]) {
                    results[name] = [];
                }
                results[name].push(net.address);
            }
        }
    }
    return results;
}

export async function getUsers() {
    const { stdout } = await exec('awk -F: "{ print $1}" /etc/passwd');
    return stdout.split('\n');
}

export async function getDiskUsage() {
    let disks = nodeDiskInfo.getDiskInfo();
    return disks;
}

export function getCPU() {
    return os.cpus();
}