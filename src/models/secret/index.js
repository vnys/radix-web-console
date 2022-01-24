import * as PropTypes from 'prop-types';

import { ConfigurationStatus } from '../configuration-status';

export default Object.freeze({
  component: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string,
  type: PropTypes.oneOf([
    'generic',
    'client-cert',
    'azure-blob-fuse-volume',
    'csi-azure-blob-volume',
    'csi-azure-key-vault-creds',
    'csi-azure-key-vault-item',
    'orphaned',
    'pending',
  ]).isRequired,
  resource: PropTypes.string.isRequired,
  status: PropTypes.oneOf(Object.values(ConfigurationStatus)).isRequired,
});
