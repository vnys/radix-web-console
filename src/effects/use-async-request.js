import { useEffect, useState } from 'react';

import requestStates from '../state/state-utils/request-states';

const useAsyncRequest = (asyncRequest, path, method, data, stopRequest) => {
  const [fetchState, setFetchState] = useState({
    data: null,
    error: null,
    status: requestStates.IDLE,
  });

  useEffect(() => {
    if (stopRequest) {
      return;
    }

    setFetchState({
      data: null,
      error: null,
      status: requestStates.IN_PROGRESS,
    });
    asyncRequest(path, method, data)
      .then(result => {
        setFetchState({
          data: result,
          status: requestStates.SUCCESS,
        });
      })
      .catch(err => {
        setFetchState({
          error: err ? err.message : '',
          status: requestStates.FAILURE,
        });
      });
  }, [asyncRequest, setFetchState, path, method, data, stopRequest]);

  const resetState = () =>
    setFetchState({
      data: null,
      error: null,
      status: requestStates.IDLE,
    });

  return [fetchState, resetState];
};

export default useAsyncRequest;
