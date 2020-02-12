import { KV } from '@app/models/kvs.model';
import { EtcdHost } from '@app/models/etcd-host.model';

export interface IState {
  kvs: Array<KV>;
  host?: EtcdHost;
}

export const initialState: IState = {
  kvs: [],
};
