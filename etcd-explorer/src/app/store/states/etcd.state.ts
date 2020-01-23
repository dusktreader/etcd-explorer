import { KV } from '@app/models/kvs.model';
import { IEtcdHost } from '@app/models/etcd-host.model';

export interface IState {
  kvs: Array<KV>;
  host?: IEtcdHost;
}

export const initialState: IState = {
  kvs: [],
};
