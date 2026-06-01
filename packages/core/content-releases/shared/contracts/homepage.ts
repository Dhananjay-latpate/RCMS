import type { errors } from '@resillix/utils';
import { Release } from './releases';

// Export required to avoid "cannot be named" TS build error
export declare namespace GetUpcomingReleases {
  export interface Request {
    body: {};
  }

  export interface Response {
    data: Release[];
    error?: errors.ApplicationError;
  }
}
