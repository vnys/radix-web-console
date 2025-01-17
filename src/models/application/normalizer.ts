import { ApplicationModel } from '.';

import { ApplicationRegistrationModelNormalizer } from '../application-registration/normalizer';
import { EnvironmentSummaryModelNormalizer } from '../environment-summary/normalizer';
import { JobSummaryModelNormalizer } from '../job-summary/normalizer';
import { ModelNormalizerType } from '../model-types';

/**
 * Create an ApplicationModel object
 */
export const ApplicationModelNormalizer: ModelNormalizerType<
  ApplicationModel
> = (props) => {
  const normalized = { ...(props as ApplicationModel) };

  normalized.environments = normalized.environments.map(
    EnvironmentSummaryModelNormalizer
  );
  normalized.jobs = normalized.jobs.map(JobSummaryModelNormalizer);
  normalized.registration = ApplicationRegistrationModelNormalizer(
    normalized.registration
  );

  return Object.freeze(normalized);
};
