import PropTypes from 'prop-types';

import Port from '../port/model';
import Replica from '../replica/model';

export default Object.freeze({
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  ports: PropTypes.arrayOf(PropTypes.shape(Port)),
  replicas: PropTypes.arrayOf(PropTypes.string),
  replicaList: PropTypes.arrayOf(PropTypes.shape(Replica)),
  secrets: PropTypes.arrayOf(PropTypes.string),
  variables: PropTypes.objectOf(PropTypes.string),
});