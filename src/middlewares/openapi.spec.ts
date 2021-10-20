import { Response, NextFunction } from 'express';
import { OpenApiContext } from '../framework/openapi.context';
import {
  OpenApiRequest,
  OpenApiRequestHandler,
  OpenAPIV3,
} from '../framework/types';

export function serveOpenApiSpec(
  openApiContext: OpenApiContext,
  responseApiDoc: OpenAPIV3.Document,
): OpenApiRequestHandler {
  return (req: OpenApiRequest, res: Response, next: NextFunction): void => {
    // note base path is empty when path is fully qualified i.e. req.path.startsWith('')
    const path = req.path.startsWith(req.baseUrl)
      ? req.path
      : `${req.baseUrl}${req.path}`;
    if (path === `${req.baseUrl}/spec`) {
      res.status(200);
      res.set('Content-type','application/json');
      res.set('Cache-control','max-age=3600');
      res.send(openApiContext.apiDoc);
    } else
      return next();
  };
}
