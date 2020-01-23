import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IAppState } from '@app/store/states/app.state';
import { IState as IEtcdState } from '@app/store/states/etcd.state';
import { IEtcdHost } from '@app/models/etcd-host.model';
import { KV } from '@app/models/kvs.model';

export const selectFeature = createFeatureSelector<IAppState, IEtcdState>('etcd');

export const selectHost = createSelector(
  selectFeature,
  (state: IEtcdState) => state.host,
);
