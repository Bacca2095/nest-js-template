import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { NodeEnv } from './config/environment/node-env.enum';
import { EventsModule } from './events/events.module';
import { LoggingMiddleware } from './middleware/logging/logging.middleware';

const validationSchema: Joi.ObjectSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid(NodeEnv.DEVELOPMENT, NodeEnv.PRODUCTION)
    .required(),
  APP_PORT: Joi.number().required(),
  APP_PREFIX: Joi.string().required(),
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `env/${process.env.NODE_ENV}.env`,
      validationSchema,
    }),
    EventsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
