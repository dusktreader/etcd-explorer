import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as moment from 'moment';

import { IAppState } from '@app/store/states/app.state';
import { IState as ITimerState } from '@app/store/states/timer.state';

export const selectFeature = createFeatureSelector<IAppState, ITimerState>('timer');

export const selectNow = createSelector(
  selectFeature,
  (state: ITimerState) => state.now,
);
