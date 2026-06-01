import type { Schema } from '@resillix/types';

export const hasDefaultAttribute = (
  attribute: Schema.Attribute.AnyAttribute
): attribute is Schema.Attribute.AnyAttribute & Schema.Attribute.DefaultOption<unknown> => {
  return 'default' in attribute;
};
