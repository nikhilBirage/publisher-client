// src/app/interceptors/functions-key.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

const FUNCTIONS_BASE_URL = 'https://publisher-api-cbf8aaggghf4bucg.centralindia-01.azurewebsites.net'; // set from environment
const FUNCTIONS_KEY = 'BC0jUpz8QwaP1Y2jvE7rfD4L-xOB5DRdXJCZJTtbGVApAzFuHGvbgQ=='; // do NOT hardcode in prod; inject from env/KeyVault

export const functionsKeyInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith(FUNCTIONS_BASE_URL)) {
    req = req.clone({
      setHeaders: {
        'x-functions-key': FUNCTIONS_KEY
      }
    });
  }
  return next(req);
};
