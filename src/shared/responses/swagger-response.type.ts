import { ApiResponseOptions } from '@nestjs/swagger';

export type SwaggerResponseOptions = {
  ok?: ApiResponseOptions;
  badRequest?: ApiResponseOptions;
  conflict?: ApiResponseOptions;
  notFound?: ApiResponseOptions;
  unauthorized?: ApiResponseOptions;
  unprocessableEntity?: ApiResponseOptions;
};
