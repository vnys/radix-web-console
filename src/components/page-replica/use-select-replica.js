import { useEffect, useState } from 'react';

import { ReplicaSummaryModelNormalizer } from '../../models/replica-summary/normalizer';

export const useSelectReplica = (environment, componentName, replicaName) => {
  const [replica, setReplica] = useState();

  useEffect(() => {
    const deployment = environment?.activeDeployment;
    const component = deployment?.components?.find(
      (x) => x.name === componentName
    );
    const selectedReplica = component?.replicaList?.find(
      (x) => x.name === replicaName
    );

    setReplica(ReplicaSummaryModelNormalizer(selectedReplica));
  }, [environment, componentName, replicaName]);

  return replica;
};

export default useSelectReplica;
