// It would be great to have these as dynamic imports so we don't repeat so much
// code. Alas, Jest doesn't seem to play ball with async/await AND dynamic
// `it()` declaration‍s ¯\_(ツ)_/¯

import applicationData from './application/test-data';
import applicationModel from './application';
import applicationNormaliser from './application/normaliser';

import applicationRegistrationData from './application-registration/test-data';
import applicationRegistrationModel from './application-registration';
import applicationRegistrationNormaliser from './application-registration/normaliser';

import applicationSummaryData from './application-summary/test-data';
import applicationSummaryModel from './application-summary';
import applicationSummaryNormaliser from './application-summary/normaliser';

import componentSummaryData from './component-summary/test-data';
import componentSummaryModel from './component-summary';
import componentSummaryNormaliser from './component-summary/normaliser';

import jobData from './job/test-data';
import jobModel from './job';
import jobNormaliser from './job/normaliser';

import jobSummaryData from './job-summary/test-data';
import jobSummaryModel from './job-summary';
import jobSummaryNormaliser from './job-summary/normaliser';

import replicaData from './replica/test-data';
import replicaModel from './replica';
import replicaNormaliser from './replica/normaliser';

import stepData from './step/test-data';
import stepModel from './step';
import stepNormaliser from './step/normaliser';

export const testData = {
  Application: applicationData,
  ApplicationRegistration: applicationRegistrationData,
  ApplicationSummary: applicationSummaryData,
  ComponentSummary: componentSummaryData,
  Job: jobData,
  JobSummary: jobSummaryData,
  Replica: replicaData,
  Step: stepData,
};

export const models = {
  Application: applicationModel,
  ApplicationRegistration: applicationRegistrationModel,
  ApplicationSummary: applicationSummaryModel,
  ComponentSummary: componentSummaryModel,
  Job: jobModel,
  JobSummary: jobSummaryModel,
  Replica: replicaModel,
  Step: stepModel,
};

export const normalisers = {
  Application: applicationNormaliser,
  ApplicationRegistration: applicationRegistrationNormaliser,
  ApplicationSummary: applicationSummaryNormaliser,
  ComponentSummary: componentSummaryNormaliser,
  Job: jobNormaliser,
  JobSummary: jobSummaryNormaliser,
  Replica: replicaNormaliser,
  Step: stepNormaliser,
};
