import { isString } from 'lodash';

import {
  EnvironmentVariableModel,
  EnvironmentVariableNormalizedModel,
} from '.';

import { ModelNormalizerType } from '../model-types';

/**
 * Create an EnvironmentVariableModel object
 */
export const EnvironmentVariableModelNormalizer: ModelNormalizerType<
  EnvironmentVariableModel,
  EnvironmentVariableNormalizedModel
> = (props) => {
  const normalized = { ...(props as EnvironmentVariableNormalizedModel) };

  normalized.isRadixVariable =
    isString(normalized.name) &&
    !!normalized.name?.match('(RADIX|RADIXOPERATOR)_*');

  return Object.freeze(normalized);
};
