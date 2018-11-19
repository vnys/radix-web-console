/**
 * This file exports models with a schema that the Web Console knows to be
 * correct. This is the Web Console end of the API contract: these objects are
 * correct for Web Console usage.
 *
 * This file provides validation. To create the actual objects, use the
 * functions in `factories.js`
 */

import PropTypes from 'prop-types';

export const ProgressStatus = Object.freeze(
  PropTypes.oneOf(['Pending', 'Running', 'Success', 'Fail'])
);

export const JobSummary = Object.freeze({
  deployTo: PropTypes.arrayOf(PropTypes.string).isRequired,
  end: PropTypes.string,
  name: PropTypes.string.isRequired,
  pipeline: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  status: ProgressStatus.isRequired,
  triggeredBy: PropTypes.string.isRequired,
});

export const ApplicationRegistration = Object.freeze({
  adGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  publicKey: PropTypes.string,
  repository: PropTypes.string.isRequired,
  sharedSecret: PropTypes.string.isRequired,
});

export const ApplicationSummary = Object.freeze({
  name: PropTypes.string.isRequired,
  latestJob: PropTypes.shape(JobSummary).isRequired,
});

export const Application = Object.freeze({
  name: PropTypes.string.isRequired,
  registration: PropTypes.shape(ApplicationRegistration).isRequired,
  //environments: Array of EnvironmentSummary
  jobs: PropTypes.arrayOf(PropTypes.shape(JobSummary)).isRequired,
  //lastWebhookContact: Timestamp [the last successful call to the webhook from GitHub]
  //lastGitClone: Timestamp [last successful remote git operation (e.g. clone)]
  //lastApplicationError: string [last error generated during a clone/webhook/config validation. This is not a Job-level error. Should be reset to null when webhook + clone + validation works correctly]
});
