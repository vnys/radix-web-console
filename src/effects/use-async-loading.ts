import { useEffect, useState } from 'react';

import { RequestState } from '../state/state-utils/request-states';

type AsyncRequestType<T> = (
  path: string,
  method: string,
  data: string
) => Promise<T>;

export type AsyncLoadingStatus<T> = {
  status: RequestState;
  data: T;
  error?: string;
};

export type AsyncLoadingResult<T> = [
  state: AsyncLoadingStatus<T>,
  resetState: () => void
];

/**
 * @param asyncRequest request to perform
 * @param path API url
 * @param method request method [ GET, POST, etc. ]
 * @param data data to send with request
 */
export function useAsyncLoading<T>(
  asyncRequest: AsyncRequestType<T>,
  path: string,
  method: string,
  data?: any
): AsyncLoadingResult<T> {
  const dataAsString = JSON.stringify(data);

  const [fetchState, setFetchState] = useState<AsyncLoadingStatus<T>>({
    status: RequestState.IDLE,
    data: null,
    error: null,
  });

  useEffect(() => {
    setFetchState({
      status: RequestState.IN_PROGRESS,
      data: null,
      error: null,
    });
    asyncRequest(path, method, dataAsString)
      .then((result) => {
        setFetchState({
          status: RequestState.SUCCESS,
          data: result,
        });
      })
      .catch((err: Error) => {
        setFetchState({
          status: RequestState.FAILURE,
          data: null,
          error: err?.message || '',
        });
      });
  }, [asyncRequest, setFetchState, path, method, dataAsString]);

  const resetState = () =>
    setFetchState({
      status: RequestState.IDLE,
      data: null,
      error: null,
    });

  return [fetchState, resetState];
}
