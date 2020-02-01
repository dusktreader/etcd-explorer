import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as moment from 'moment';

import { IAppState } from '@app/store/states/app.state';
import { IState as IEtcdState } from '@app/store/states/etcd.state';
import { EtcdHost } from '@app/models/etcd-host.model';
import { KV } from '@app/models/kvs.model';
import { selectNow } from '@app/store/selectors/timer.selector';

export const selectFeature = createFeatureSelector<IAppState, IEtcdState>('etcd');

export const selectHost = createSelector(
  selectFeature,
  (state: IEtcdState) => state.host,
);

export const selectHostNow = createSelector(
  selectHost,
  selectNow,
  (host: EtcdHost, now: moment.Moment) => ({ host, now }),
);
