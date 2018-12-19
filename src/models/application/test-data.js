export default [
  {
    __testDescription: 'Application with job',
    name: 'My app',
    environments: [
      {
        name: 'dev',
        status: 'Consistent',
        activeDeployment: {
          name: 'a-deployment',
          environment: 'dev',
          activeFrom: '2018-11-28T14:49:48Z',
        },
      },
    ],
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
];