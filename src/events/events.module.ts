import { Module } from '@nestjs/common';
import { EventsController } from './controllers/events.controller';
import { EventsService } from './providers/events.service';

@Module({
  providers: [EventsService],
  controllers: [EventsController],
})
export class EventsModule {}
