import { EnvironmentSummaryModel } from '.';

import { DeploymentSummaryModelNormalizer } from '../deployment-summary/normalizer';
import { ModelNormalizerType } from '../model-types';

/**
 * Create an EnvironmentSummaryModel object
 */
export const EnvironmentSummaryModelNormalizer: ModelNormalizerType<
  EnvironmentSummaryModel
> = (props) => {
  const normalized = { ...(props as EnvironmentSummaryModel) };

  normalized.activeDeployment =
    normalized.activeDeployment &&
    DeploymentSummaryModelNormalizer(normalized.activeDeployment);

  return Object.freeze(normalized);
};
