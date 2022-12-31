import { Controller, Sse } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { interval, map, Observable } from 'rxjs';
import { EventsService } from '../providers/events.service';
import { ServerStatsResponse } from '../responses/events.responses';
import { IServerStats } from '../interfaces/server-stats.interface';

interface IMessageEvent {
  data: string | IServerStats;
}

const UPDATE_INTERVAL = 2000;

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventService: EventsService) {}

  @Sse('status')
  @ApiResponse(ServerStatsResponse.ok)
  async sendEvent(): Promise<Observable<IMessageEvent>> {
    const serverStatus = await this.eventService.checkServerStatus();
    return interval(UPDATE_INTERVAL).pipe(
      map(() => {
        return { data: serverStatus };
      }),
    );
  }
}
