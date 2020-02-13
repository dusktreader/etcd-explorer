import { createReducer, on, State, Action } from '@ngrx/store';

import {
  connectFinal,
  connectFail,
  disconnect,
  loadKVFinal,
  setKVFinal,
  createKVFinal,
  deleteKVFinal,
  setPrefix,
} from '@app/store/actions/etcd.action';
import { initialState, IState } from '@app/store/states/etcd.state';

export function reducer(state: IState | undefined, action: Action) {
  return createReducer(
    initialState,

    on(connectFinal, (previousState, { payload }) => ({
        ...state,
        host: payload,
    })),

    on(connectFail, previousState => ({
      ...previousState,
      host: null,
    })),

    on(disconnect, previousState => ({
      ...previousState,
      host: null,
      kvs: null,
    })),

    on(loadKVFinal, (previousState, { payload }) => ({
      ...previousState,
      kvs: payload,
    })),

    on(setKVFinal, (previousState, { payload }) => ({
      ...previousState,
      kvs: previousState.kvs.map(kv => kv.key === payload.key ? payload : kv),
    })),

    on(createKVFinal, (previousState, { payload }) => ({
      ...previousState,
      kvs: [...previousState.kvs, payload].sort((kv1, kv2) => kv1.key.localeCompare(kv2.key)),
    })),

    on(deleteKVFinal, (previousState, { payload }) => ({
      ...previousState,
      kvs: previousState.kvs.filter(kv => kv.key !== payload),
    })),

    on(setPrefix, (previousState, { payload }) => ({
      ...previousState,
      prefix: payload,
    })),

  )(state, action);
}
