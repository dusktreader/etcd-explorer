import {
  IState as IEtcdState,
  initialState as initialEtcdState,
} from '@app/store/states/etcd.state';

export interface IAppState {
  etcd?: IEtcdState;
}

export const initialAppState: IAppState = {
  etcd: initialEtcdState,
};
