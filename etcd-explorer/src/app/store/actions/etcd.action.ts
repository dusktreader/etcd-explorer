import { createAction } from '@ngrx/store';

import { KV } from '@app/models/kvs.model';
import { EtcdHost } from '@app/models/etcd-host.model';

export interface IFail {
  err: any;
  message: string;
}

export const TConnect = '[Connect] Start connecting to the etcd host';
export const connect = createAction(TConnect, (payload: EtcdHost) => ({
  payload,
}));

export const TConnectFinal = '[Connect] Finalize connecting to the etcd host';
export const connectFinal = createAction(TConnectFinal, (payload: EtcdHost) => ({
  payload,
}));

export const TConnectFail = '[Connect] Fail connecting to the etcd host';
export const connectFail = createAction(TConnectFail, (payload: IFail) => ({
  payload,
}));

export const TDisconnect = '[Disconnect] Disconnect from the etcd host';
export const disconnect = createAction(TDisconnect);

export interface ILoadKV {
  host: EtcdHost;
  prefix: string;
}
export const TLoadKV = '[LoadKV] Start loading key-values from etcd';
export const loadKV = createAction(TLoadKV, (payload: ILoadKV) => ({
  payload,
}));

export const TLoadKVFinal = '[LoadKV] Finalize loading key-values from etcd';
export const loadKVFinal = createAction(TLoadKVFinal, (payload: Array<KV>) => ({
  payload,
}));

export const TLoadKVFail = '[LoadKV] Fail loading key-values from etcd';
export const loadKVFail = createAction(TLoadKVFail, (payload: IFail) => ({
  payload,
}));

export const TSetKV = '[SetKV] Start setting the key-value';
export const setKV = createAction(TSetKV, (payload: KV) => ({
  payload
}));

export const TSetKVFinal = '[LoadKV] Finalize setting the key-value';
export const setKVFinal = createAction(TSetKVFinal, (payload: KV) => ({
  payload,
}));

export const TSetKVFail = '[SetKV] Fail setting the key-value';
export const setKVFail = createAction(TSetKVFail, (payload: IFail) => ({
  payload,
}));

export const TDeleteKV = '[DeleteKV] Start deleting the key-value';
export const deleteKV = createAction(TDeleteKV, (payload: string) => ({
  payload
}));

export const TDeleteKVFinal = '[DeleteKV] Finalize deleting the key-value';
export const deleteKVFinal = createAction(TDeleteKVFinal, (payload: string) => ({
  payload,
}));

export const TDeleteKVFail = '[DeleteKV] Fail deleting the key-value';
export const deleteKVFail = createAction(TSetKVFail, (payload: IFail) => ({
  payload,
}));
