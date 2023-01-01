import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

import { Request, Response } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private logger = new Logger();

  use(req: Request, res: Response, next: () => void) {
    this.logger.log(
      JSON.stringify({
        method: req.method,
        path: req.path,
        status: res.statusCode,
      }),
      'Request',
    );

    if (next) {
      next();
    }
  }
}
