import { createReducer, on, Action } from '@ngrx/store';
import * as moment from 'moment';

import { tick } from '@app/store/actions/timer.action';
import { initialState, IState } from '@app/store/states/timer.state';

export function reducer(state: IState | undefined, action: Action) {
  return createReducer(
    initialState,

    on(tick, (previousState) => ({
      ...previousState,
      now: moment(),
    })),
  )(state, action);
}
