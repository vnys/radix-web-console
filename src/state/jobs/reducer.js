import actionTypes from './action-types';

import subscriptionsActionTypes from '../subscriptions/action-types';
import { JobSummaryModelNormalizer } from '../../models/job-summary/normalizer';

const initialState = [];

export const jobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.JOBS_SNAPSHOT:
      return action.payload.map(JobSummaryModelNormalizer);

    case subscriptionsActionTypes.SUBSCRIPTION_ENDED:
      return action.resourceName === 'JOBS' ? initialState : state;

    default:
      return state;
  }
};

export default jobsReducer;
