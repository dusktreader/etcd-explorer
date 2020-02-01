import { createReducer, on, State, Action } from '@ngrx/store';

import { connectFinal, connectFail, loadKVFinal } from '@app/store/actions/etcd.action';
import { initialState, IState } from '@app/store/states/etcd.state';

export function reducer(state: IState | undefined, action: Action) {
  return createReducer(
    initialState,

    on(connectFinal, (previousState, { payload }) => ({
        ...state,
        host: payload,
    })),

    on(connectFail, previousState => ({
      ...state,
      host: null,
    })),

    on(loadKVFinal, (previousState, { payload }) => ({
      ...state,
      kvs: payload,
    })),

  )(state, action);
}
