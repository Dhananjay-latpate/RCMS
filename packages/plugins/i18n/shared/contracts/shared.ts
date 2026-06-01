import type { Data } from '@resillix/types';

export interface Entity {
  id: Data.ID;
  createdAt: string;
  updatedAt: string;
}
