/* global spyOn */
import rpn from 'request-promise-native';

import { propsFromDefs, checkExact } from 'swagger-proptypes';
import * as models from '.';
import * as factories from './factories';

import configHandler from '../utils/config';
import { keys as configKeys } from '../utils/config/keys';

const apiServerBaseDomain = 'server-radix-api';
const apiServerPath = '/swaggerui/swagger.json';
const apiServerEnvironment = configHandler.getConfig(
  configKeys.RADIX_API_ENVIRONMENT
);

// Sample data sent to each model factory. Note that we do NOT test this data
// directly; instead we test the output of the factory functions

const sampleModelData = {
  ApplicationSummary: [
    {
      __testDescription: 'Latest job running',
      name: 'My app 1',
      latestJob: {
        deployTo: ['an-environment'],
        name: 'some-job',
        pipeline: 'a-pipeline',
        start: '2018-11-19T14:31:23Z',
        status: 'Running',
        triggeredBy: 'Some trigger',
      },
    },
    {
      __testDescription: 'Latest job failed',
      name: 'My app 2',
      latestJob: {
        deployTo: ['an-environment'],
        name: 'some-job',
        pipeline: 'a-pipeline',
        start: '2018-11-19T14:31:23Z',
        end: '2018-11-19T14:37:10Z',
        status: 'Failed',
        triggeredBy: 'Some trigger',
      },
    },
  ],
  ApplicationRegistration: [
    {
      __testDescription: 'Without public key',
      adGroups: ['Group 1', 'Group 2'],
      name: 'name',
      repository: 'some/path/to/a/repo',
      sharedSecret: 'aSharedSecret',
    },
    {
      __testDescription: 'With public key',
      adGroups: ['Group 1', 'Group 2'],
      name: 'a-name',
      publicKey: 'a-big-public-key',
      repository: 'some/path/to/a/repo',
      sharedSecret: 'aSharedSecret',
    },
  ],
  Application: [
    {
      __testDescription: 'Application with job',
      name: 'My app',
      registration: {
        adGroups: ['Group 1', 'Group 2'],
        name: 'name',
        repository: 'some/path/to/a/repo',
        sharedSecret: 'aSharedSecret',
      },
      jobs: [
        {
          deployTo: ['an-environment'],
          name: 'some-job',
          pipeline: 'build-deploy',
          start: '2018-11-19T14:31:23Z',
          end: '2018-11-19T14:37:10Z',
          status: 'Failed',
          triggeredBy: 'Some trigger',
        },
      ],
    },
  ],
};

describe('Data samples match API schema requirements', () => {
  let props;

  beforeAll(async done => {
    // Retrieve Swagger definitions from API server

    const url = `https://${apiServerBaseDomain}-${apiServerEnvironment}.${configHandler.getDomain()}${apiServerPath}`;
    console.log(`Retrieving Swagger defs from ${url}`);

    const defs = await rpn(url, { json: true });
    props = propsFromDefs(defs.definitions);
    done();
  });

  Object.keys(sampleModelData).forEach(modelType => {
    // We create a test for each model type, and feed the data in the samples
    // through the factory function for that model. The resulting object is then
    // checked against the schema provided by the API (which is provided in the
    // form of an auto-generated PropType structure).
    //
    // If the proptypes check fails, we know that the schema that the API server
    // expects is different from what the web console is using (which is encoded
    // in the factory functions)
    describe(modelType, () => {
      // It is expected that a factory function named `{modelName}Factory`
      // exists in `factories.js`
      const modelFactory = factories[`${modelType}Factory`];
      // Iterate over all data samples for this modelType
      const samples = sampleModelData[modelType];

      samples.forEach((sample, idx) => {
        const description =
          `Sample #${idx} ` + (sample.__testDescription || '');

        it(description, () => {
          // Note that we are checking the result of `modelFactory(sample)`, not
          // `sample` itself
          const model = modelFactory(sample);

          const fn = () => checkExact(modelType, props[modelType], model);
          expect(fn).not.toThrow();
        });
      });
    });
  });
});

describe('Data samples match Web Console schema requirements', () => {
  Object.keys(sampleModelData).forEach(modelType => {
    // We create a test for each model type, and feed the data in the samples
    // through the factory function for that model. The resulting object is then
    // checked against the schema defined by the Web Console.
    describe(modelType, () => {
      // It is expected that a proptype definition named `{modelName}` exists in
      // `index.js`
      const props = models[modelType];

      // It is expected that a factory function named `{modelName}Factory`
      // exists in `factories.js`
      const modelFactory = factories[`${modelType}Factory`];
      // Iterate over all data samples for this modelType
      const samples = sampleModelData[modelType];

      samples.forEach((sample, idx) => {
        const description =
          `Sample #${idx} ` + (sample.__testDescription || '');

        it(description, () => {
          // Note that we are checking the result of `modelFactory(sample)`, not
          // `sample` itself
          const model = modelFactory(sample);

          const fn = () => checkExact(modelType, props, model);
          expect(fn).not.toThrow();
        });
      });
    });
  });
});
