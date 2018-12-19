import { Link } from 'react-router-dom';
import React from 'react';

import Chip from '../chip';

import { getEnvUrl } from '../../utils/routing';

const Environments = ({ appName, envs }) => {
  if (!envs || envs.length === 0) {
    return 'No environments';
  }

  return (
    <ul className="o-inline-list o-inline-list--spacing">
      {envs.map(env => (
        <li key={env.name}>
          <Chip>
            <Link to={getEnvUrl(appName, env.name)}>{env.name}</Link>
          </Chip>
        </li>
      ))}
    </ul>
  );
};

export default Environments;