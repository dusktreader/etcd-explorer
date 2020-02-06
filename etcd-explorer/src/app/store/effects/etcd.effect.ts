import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, tap, mergeMap, catchError, withLatestFrom } from 'rxjs/operators';

import { EtcdService } from '@app/services/etcd.service';
import { EtcdHost } from '@app/models/etcd-host.model';
import { KV } from '@app/models/kvs.model';
import { selectHost } from '@app/store/selectors/etcd.selector';
import { IAppState } from '@app/store/states/app.state';

import {
  connect,
  connectFinal,
  connectFail,
  ILoadKV,
  loadKV,
  loadKVFinal,
  loadKVFail,
  setKV,
  setKVFinal,
  setKVFail,
  deleteKV,
  deleteKVFinal,
  deleteKVFail,
} from '@app/store/actions/etcd.action';

@Injectable()
export class Effects {

  connect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(connect),
      map(action => action.payload),
      mergeMap(host => this.etcdService.testConnection(host).pipe(
        map(connectedHost => connectFinal(connectedHost)),
        catchError(err => {
          const message = 'Could not connect to etcd host';
          console.error(message);
          console.log(err);
          return of(connectFail({ err, message }));
        }),
      )),
    );
  });

  connectFinal$ = createEffect(
    () => this.actions$.pipe(
      ofType(connectFinal),
      map(action => action.payload),
      tap(host => console.log(`Connected to ${host.url}`)),
    ),
    { dispatch: false }
  );

  loadKV$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadKV),
      map(action => action.payload),
      mergeMap(({ host, prefix }: ILoadKV) => this.etcdService.loadKV(host, prefix).pipe(
        map(kvs => loadKVFinal(kvs)),
        catchError(err => {
          const message = 'Failed to retrieve key-values';
          console.error(message);
          console.log(err);
          return of(loadKVFail({err, message}));
        }),
      )),
    );
  });

  setKV$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(setKV),
      map(action => action.payload),
      withLatestFrom(this.store.pipe(select(selectHost))),
      mergeMap(([kv, host]: [KV, EtcdHost]) => this.etcdService.setKV(host, kv).pipe(
        map(() => setKVFinal(kv)),
        catchError(err => {
          const message = `Failed to set key-value at ${kv.key}`;
          console.error(message);
          console.log(err);
          return of(setKVFail({err, message}));
        }),
      )),
    );
  });

  deleteKV$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteKV),
      map(action => action.payload),
      withLatestFrom(this.store.pipe(select(selectHost))),
      mergeMap(([key, host]: [string, EtcdHost]) => this.etcdService.deleteKV(host, key).pipe(
        map(() => deleteKVFinal(key)),
        catchError(err => {
          const message = `Failed to delete key-value at ${key}`;
          console.error(message);
          console.log(err);
          return of(deleteKVFail({err, message}));
        }),
      )),
    );
  });

  constructor(
    private actions$: Actions,
    private etcdService: EtcdService,
    private store: Store<IAppState>,
  ) {}
}
