import {
  faClock,
  faGlobeAfrica,
  faHashtag,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { JobSummary as JobSummaryModel } from 'radix-web-console-models';
import { Link } from 'react-router-dom';
import distanceInWords from 'date-fns/distance_in_words';
import PropTypes from 'prop-types';
import React from 'react';

import Chip, { progressStatusToChipType } from '../chip';
import Clickbox from '../clickbox';
import CommitHash from '../commit-hash';

import { formatDateTime } from '../../utils/datetime';
import { routeWithParams, themedColor, smallJobName } from '../../utils/string';
import routes from '../../routes';

const Duration = ({ job }) => {
  if (!job.ended) {
    return null;
  }

  return (
    <span title="Job duration">
      {distanceInWords(new Date(job.started), new Date(job.ended))}
    </span>
  );
};

const EnvsData = ({ appName, envs }) => {
  if (!envs || !envs.length) {
    return null;
  }
  const sortedEnvs = envs.sort();
  return (
    <React.Fragment>
      <div className="job-summary__icon">
        <FontAwesomeIcon
          color={themedColor(sortedEnvs[0])}
          icon={faGlobeAfrica}
          size="lg"
        />
      </div>
      <div>
        {sortedEnvs.map(envName => (
          <Link
            key={envName}
            to={routeWithParams(routes.appEnvironment, { appName, envName })}
          >
            {envName}
          </Link>
        ))}
      </div>
    </React.Fragment>
  );
};

const JobSummary = ({ appName, job }) => {
  const jobLink = routeWithParams(routes.appJob, {
    appName,
    jobName: job.name,
  });

  return (
    <Clickbox to={jobLink}>
      <div className={`job-summary job-summary--${job.status.toLowerCase()}`}>
        <ul className="job-summary__data">
          <li className="job-summary__data-section">
            <div className="job-summary__icon">
              <FontAwesomeIcon icon={faHashtag} size="lg" />
            </div>
            <div className="job-summary__data-list">
              <strong>User Name</strong>
              <CommitHash commit={job.commitID} />
            </div>
          </li>
          <li className="job-summary__data-section">
            <div className="job-summary__icon">
              <FontAwesomeIcon icon={faClock} size="lg" />
            </div>
            <div className="job-summary__data-list">
              <div title="Start time">{formatDateTime(job.started)}</div>
              <Duration job={job} />
            </div>
          </li>
          <li className="job-summary__data-section">
            <EnvsData appName={appName} envs={job.environments} />
          </li>
          <li className="job-summary__data-section">
            <Chip type={progressStatusToChipType(job.status)}>
              {job.status}
            </Chip>
          </li>
          <li className="job-summary__data-section">
            <div className="job-summary__data-list">
              <Link className="job-summary__link" to={jobLink}>
                {smallJobName(job.name)}
              </Link>
              <div>{job.pipeline}</div>
            </div>
          </li>
        </ul>
      </div>
    </Clickbox>
  );
};

JobSummary.propTypes = {
  appName: PropTypes.string.isRequired,
  job: PropTypes.shape(JobSummaryModel).isRequired,
};

export default JobSummary;
