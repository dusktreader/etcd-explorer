import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { Observable, from, of, throwError } from 'rxjs';
import { map, mergeMap, tap, filter } from 'rxjs/operators';
import { Base64 } from 'js-base64';

import { IEtcdHost } from '@app/models/etcd-host.model';
import { IAppState } from '@app/store/states/app.state';
import { selectHost } from '@app/store/selectors/etcd.selector';

@Injectable({
  providedIn: 'root'
})
export class EtcdService {

  constructor(
    private http: HttpClient,
    private store: Store<IAppState>,
  ) {
    console.log('CONSTRUCTING SERVICE');
    this.store.pipe(
      select(selectHost),
      filter(host => !!host),
      tap(host => console.log('SUB GOT A HOST: ', host)),
      filter((etcdHost: IEtcdHost) => !!etcdHost),
      mergeMap(host => this.http.post<any>(
        `http://${host.hostname}:${host.port}/v3/kv/range`,
        {
          key: Base64.encode('pa'),
          range_end: Base64.encode('\0'),
        },
        { observe: 'response' },
      ))
    ).subscribe(
      stuff => {
        console.log('GOT STUFF: ', stuff);
        console.log('KEYS: ', stuff.body.kvs.map(kv => Base64.decode(kv.key)));
      },
    );
  }

  loadKVs(): Observable<Array<any>> | void {}
}
