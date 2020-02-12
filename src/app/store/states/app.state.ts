import {
  IState as IEtcdState,
  initialState as initialEtcdState,
} from '@app/store/states/etcd.state';
import {
  IState as ITimerState,
  initialState as initialTimerState,
} from './timer.state';

export interface IAppState {
  etcd?: IEtcdState;
  timer?: ITimerState;
}

export const initialAppState: IAppState = {
  etcd: initialEtcdState,
  timer: initialTimerState,
};
