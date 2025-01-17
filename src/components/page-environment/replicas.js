import { smallReplicaName } from '../../utils/string';
import * as routing from '../../utils/routing';
import { Link } from 'react-router-dom';
import { Typography } from '@equinor/eds-core-react';

const Replicas = ({ appName, envName, componentName, replicaList }) => (
  <>
    {replicaList ? (
      replicaList
        .map((replica, i) => (
          <Link
            key={i}
            to={routing.getReplicaUrl(
              appName,
              envName,
              componentName,
              replica.name
            )}
          >
            <Typography link as="span">
              {smallReplicaName(replica.name)}
            </Typography>
          </Link>
        ))
        .reduce((prev, curr) => [
          ...(Array.isArray(prev) ? prev : [prev]),
          ', ',
          curr,
        ])
    ) : (
      <span>No active replicas</span>
    )}
  </>
);

export default Replicas;
