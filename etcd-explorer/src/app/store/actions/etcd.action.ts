import { createAction } from '@ngrx/store';

import { KV } from '@app/models/kvs.model';
import { IEtcdHost } from '@app/models/etcd-host.model';

export interface IFail {
  err: any;
  message: string;
}

export const TConnect = '[Connect] Start connecting to the etcd host';
export const connect = createAction(TConnect, (payload: IEtcdHost) => ({
  payload,
}));

export const TConnectFinal = '[Connect] Finalize connecting to the etcd host';
export const connectFinal = createAction(TConnectFinal, (payload: IEtcdHost) => ({
  payload,
}));

export const TConnectFail = '[Connect] Fail connecting to the etcd host';
export const connectFail = createAction(TConnectFail, (payload: IFail) => ({
  payload,
}));

export const TLoadKV = '[LoadKV] Start loading key-values from etcd';
export const loadKV = createAction(TLoadKV);

export const TLoadKVFinal = '[LoadKV] Finalize loading key-values from etcd';
export const loadKVFinal = createAction(TLoadKVFinal, (payload: Array<KV>) => ({
  payload,
}));

export const TLoadKVFail = '[LoadKV] Fail loading key-values from etcd';
export const loadKVFail = createAction(TLoadKVFail, (payload: IFail) => ({
  payload,
}));
