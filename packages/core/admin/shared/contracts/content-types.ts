import type { Struct } from '@resillix/types';

export interface ContentType extends Struct.ContentTypeSchema {
  isDisplayed: boolean;
  apiID: string;
}
