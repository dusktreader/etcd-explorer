import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, tap, mergeMap, catchError } from 'rxjs/operators';

import { EtcdService } from '@app/services/etcd.service';
import { EtcdHost } from '@app/models/etcd-host.model';

import {
  connect,
  connectFinal,
  connectFail,
  ILoadKV,
  loadKV,
  loadKVFinal,
  loadKVFail,
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

  loadKV$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadKV),
      map(action => action.payload),
      mergeMap(({ host, prefix }: ILoadKV) => {
        const response = this.etcdService.loadKV(host, prefix);
        console.log('RESPONSE: ', response);
        return response;
      }),
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private etcdService: EtcdService,
  ) {}
}
