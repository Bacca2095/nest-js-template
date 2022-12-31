import { HttpStatus } from '@nestjs/common';
import { SwaggerResponseOptions } from '../../shared/responses/swagger-response.type';

export const ServerStatsResponse: SwaggerResponseOptions = {
  ok: {
    status: HttpStatus.OK,
    schema: {
      properties: {
        data: {
          oneOf: [
            {
              type: 'string',
            },
            {
              type: 'object',
              properties: {
                cpu: { type: 'number' },
                disk: { type: 'number' },
                ram: { type: 'number' },
              },
            },
          ],
        },
      },
    },
  },
};
