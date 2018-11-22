import actionTypes from './action-types';

import { ApplicationFactory } from '../../models/factories';

export default (state = null, action) => {
  switch (action.type) {
    case actionTypes.APP_SNAPSHOT:
      return ApplicationFactory(action.payload);

    default:
      return state;
  }
};