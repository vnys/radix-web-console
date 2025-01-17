import subscriptionsActionTypes from '../subscriptions/action-types';
import alertingNormaliser from '../../models/alerting/normaliser';
import { combineReducers } from 'redux';
import { makeRequestReducer } from '../state-utils/request';
import { createReducer } from '@reduxjs/toolkit';
import { cloneDeep } from 'lodash';
import update from 'immutability-helper';

const initialState = null;

const buildReceiverSecrets = (receviers) => {
  const secretsConfig = {};
  if (!receviers) {
    return secretsConfig;
  }

  for (const [receiverName, receiver] of Object.entries(receviers)) {
    secretsConfig[receiverName] = {};
    if (receiver.slackConfig) {
      secretsConfig[receiverName]['slackConfig'] = { webhookUrl: undefined };
    }
  }

  return secretsConfig;
};

export const buildEditConfig = (config) => {
  return {
    alerts: cloneDeep(config.alerts),
    receivers: cloneDeep(config.receivers),
    receiverSecrets: buildReceiverSecrets(config.receivers),
  };
};

export const alertingReducer = (actionPrefix) => {
  const editReducer = createReducer({ editing: false }, (builder) => {
    builder.addCase(`${actionPrefix}_EDIT_ENABLE`, (state, action) => {
      state.originalEditConfig = buildEditConfig(action.payload);
      state.editConfig = cloneDeep(state.originalEditConfig);
      state.editing = true;
    });
    builder.addCase(`${actionPrefix}_EDIT_DISABLE`, (state) => {
      delete state.originalEditConfig;
      delete state.editConfig;
      state.editing = false;
    });
    builder.addCase(`${actionPrefix}_EDIT_SET_SLACKURL`, (state, action) => {
      const emptySlackUrl = action.slackUrl
        ? action.slackUrl.trim().length === 0
        : true;
      state.editConfig = update(state.editConfig, {
        receiverSecrets: (rs) =>
          update(rs, {
            [action.receiver]: (r) =>
              update(r, {
                slackConfig: {
                  $merge: {
                    webhookUrl: emptySlackUrl
                      ? undefined
                      : action.slackUrl.trim(),
                  },
                },
              }),
          }),
      });
    });
  });

  const instanceReducer = (state = initialState, action) => {
    switch (action.type) {
      case `${actionPrefix}_SNAPSHOT`:
        return alertingNormaliser(action.payload);
      case subscriptionsActionTypes.SUBSCRIPTION_ENDED:
        return action.resourceName === actionPrefix ? initialState : state;
      default:
        return state;
    }
  };

  return combineReducers({
    edit: editReducer,
    instance: instanceReducer,
    enableRequest: makeRequestReducer(`${actionPrefix}_ENABLE`),
    disableRequest: makeRequestReducer(`${actionPrefix}_DISABLE`),
    updateRequest: makeRequestReducer(`${actionPrefix}_UPDATE`),
  });
};
