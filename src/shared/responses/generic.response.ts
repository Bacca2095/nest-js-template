import { SwaggerResponseOptions } from './swagger-response.type';

export const HttpResponse = {
  statusCode: { type: 'number' },
  message: { type: 'string' },
};

export const DefaultResponse: SwaggerResponseOptions = {
  ok: {
    schema: {
      properties: HttpResponse,
      example: {
        statusCode: 200,
        message: 'Created successfully',
      },
    },
  },
  badRequest: {
    schema: {
      properties: HttpResponse,
      example: {
        statusCode: 400,
        message: 'Bad request',
      },
    },
  },
  unauthorized: {
    schema: {
      properties: HttpResponse,
      example: {
        statusCode: 401,
        message: 'Unauthorized',
      },
    },
  },
  notFound: {
    schema: {
      properties: HttpResponse,
      example: {
        statusCode: 404,
        message: 'Not Found',
      },
    },
  },
};
