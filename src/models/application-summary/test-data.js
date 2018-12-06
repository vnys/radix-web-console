export default [
  {
    __testDescription: 'Latest job running',
    name: 'My app 1',
    latestJob: {
      deployTo: ['an-environment'],
      name: 'some-job',
      pipeline: 'build-deploy',
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
      pipeline: 'build-deploy',
      start: '2018-11-19T14:31:23Z',
      end: '2018-11-19T14:37:10Z',
      status: 'Failed',
      triggeredBy: 'Some trigger',
    },
  },
];
