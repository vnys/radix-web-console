import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { useInterval } from './use-interval';

import { RequestState } from '../state/state-utils/request-states';

type AsyncRequestType<T, R> = (
  path: string,
  method?: string,
  data?: R
) => Promise<T>;

export type AsyncPollingStatus<T> = {
  status: RequestState;
  data: T;
  error?: string;
};

export type AsyncPollingResult<T> = [
  state: AsyncPollingStatus<T>,
  poll: () => void
];

function poll<T, R>(
  asyncRequest: AsyncRequestType<T, R>,
  setFetchState: Dispatch<SetStateAction<AsyncPollingStatus<T>>>,
  path: string
): void {
  setFetchState((prevState) => ({
    status:
      prevState.status === RequestState.SUCCESS
        ? RequestState.SUCCESS
        : RequestState.IN_PROGRESS,
    data: prevState.data,
    error: null,
  }));
  asyncRequest(path, 'GET')
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
}

/**
 * @param asyncRequest request to perform
 * @param path API url
 * @param pollInterval poll interval in ms
 */
export function useAsyncPolling<T, R>(
  asyncRequest: AsyncRequestType<T, R>,
  path: string,
  pollInterval: number
): AsyncPollingResult<T> {
  const [refreshCount, setRefreshCount] = useState<number>(0);
  const [fetchState, setFetchState] = useState<AsyncPollingStatus<T>>({
    status: RequestState.IDLE,
    data: null,
    error: null,
  });

  useInterval(
    () => {
      if (pollInterval > 0) {
        setRefreshCount((prevValue) => prevValue + 1);
      }
    },
    pollInterval ? pollInterval : 15000
  );

  const pollCallback = useCallback<() => void>(
    () => poll(asyncRequest, setFetchState, path),
    [asyncRequest, setFetchState, path]
  );

  useEffect(() => {
    pollCallback();
  }, [pollCallback, pollInterval, refreshCount]);

  return [fetchState, pollCallback];
}
