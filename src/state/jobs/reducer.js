import actionTypes from './action-types';
import subscriptionsActionTypes from '../subscriptions/action-types';

import { JobSummaryFactory } from 'radix-web-console-models';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.JOBS_SNAPSHOT:
      return action.payload.map(job => JobSummaryFactory(job));

    case subscriptionsActionTypes.SUBSCRIPTION_ENDED:
      return action.resourceName === 'JOBS' ? initialState : state;

    default:
      return state;
  }
};