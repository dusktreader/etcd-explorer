import { createReducer, on, State, Action } from '@ngrx/store';

import { connect, loadKVFinal } from '@app/store/actions/etcd.action';
import { initialState, IState } from '@app/store/states/etcd.state';

export function reducer(state: IState | undefined, action: Action) {
  return createReducer(
    initialState,

    on(connect, (previousState, { payload }) => {
      return ({
        ...state,
        host: payload,
      });
    }),

    on(loadKVFinal, (previousState, { payload }) => ({
      ...state,
      kvs: payload,
    })),

  )(state, action);
}
