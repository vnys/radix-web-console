import { JobSummaryModel } from '.';

import { ScanModelNormaliser } from '../scan/normaliser';

/**
 * Create a JobSummary object
 */
export const JobSummaryNormaliser = (
  props: JobSummaryModel | unknown
): Readonly<JobSummaryModel> => {
  const normalised = { ...(props as JobSummaryModel) };

  normalised.started = normalised.started ? new Date(normalised.started) : null;
  normalised.ended = normalised.ended ? new Date(normalised.ended) : null;
  normalised.created = normalised.created ? new Date(normalised.created) : null;
  normalised.stepSummaryScans = normalised.stepSummaryScans?.map((x) =>
    ScanModelNormaliser(x)
  );

  return Object.freeze(normalised);
};