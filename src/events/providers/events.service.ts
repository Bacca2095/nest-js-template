import checkDiskSpace from 'check-disk-space';
import * as osu from 'node-os-utils';
import { Injectable } from '@nestjs/common';
import { IServerStats } from '../interfaces/server-stats.interface';

@Injectable()
export class EventsService {
  async checkServerStatus(): Promise<IServerStats> {
    const isWindows = osu.os.platform() === 'win32';
    const { free, size } = await checkDiskSpace(isWindows ? 'C:/' : '/');
    const ramPercent = (await osu.mem.info()).usedMemPercentage;
    const diskPercent = (free / size) * 100;
    const cpuPercent = await osu.cpu.usage();

    return { cpu: cpuPercent, disk: diskPercent, ram: ramPercent };
  }
}
