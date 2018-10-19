import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import React from 'react';

import fetchMock from 'fetch-mock';
import { Server } from 'mock-socket';

import { createUrl } from '../api/api-helpers';
import { setDummyAuthentication } from '../api/api-config';
import { loginSuccess } from '../state/auth/action-creators';
import routes from '../routes';
import store from './store';

// Set up mock socket servers
// TODO: When using only Socket.io, clean this up to provide only one socket

const mockServerRR = new Server(
  createUrl('radixregistrations', 'radix_dev_playground_radix', 'wss://') +
    '?watch=true'
);

const mockServerRA = new Server(
  createUrl('radixapplications', 'radix_dev_playground_radix', 'wss://') +
    '?watch=true'
);

const mockServerJobs = new Server(
  createUrl(
    'jobs?labelSelector=build',
    'radix_dev_playground_batch',
    'wss://'
  ) + '&watch=true'
);

// Set up mock fetch()

fetchMock.post('*', { thisIsADummyResponse: true });

// Prevent Adal.js from being called

setDummyAuthentication(true);

// "Log in" the user

store.dispatch(loginSuccess());

// Load the requested content

const testPathMatch = window.location.pathname.match(
  RegExp(`^${routes.devIntegration}`)
);

let component = testPathMatch[1];
let integration, content;

try {
  integration = require(`../components/${component}/integration`);
  content = integration.default;
} catch (e) {
  content = (
    <p>
      The file "integration.js" does not exist for the component "{component}".
    </p>
  );
}

if (integration) {
  // TODO: When using only Socket.io, clean this up to provide only one socket
  integration.injectMockSocketServers({
    rr: mockServerRR,
    ra: mockServerRA,
    jobs: mockServerJobs,
  });
}

export default (
  <Provider store={store}>
    <MemoryRouter>{content}</MemoryRouter>
  </Provider>
);