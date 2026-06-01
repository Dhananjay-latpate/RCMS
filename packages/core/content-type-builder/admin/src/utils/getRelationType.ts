import type { Schema } from '@resillix/types';

/**
 *
 * Retrieves the relation type
 */
export const getRelationType = (
  relation: Schema.Attribute.RelationKind.Any,
  targetAttribute?: string | null
) => {
  const hasNotTargetAttribute = targetAttribute === undefined || targetAttribute === null;

  if (relation === 'oneToOne' && hasNotTargetAttribute) {
    return 'oneWay';
  }

  if (relation === 'oneToMany' && hasNotTargetAttribute) {
    return 'manyWay';
  }

  return relation;
};
