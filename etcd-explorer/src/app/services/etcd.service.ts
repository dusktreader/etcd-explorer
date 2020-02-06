import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { Observable, BehaviorSubject, from, of, throwError, combineLatest } from 'rxjs';
import { map, mergeMap, tap, filter } from 'rxjs/operators';
import { Base64 } from 'js-base64';

import { EtcdHost } from '@app/models/etcd-host.model';
import { KV } from '@app/models/kvs.model';
import { IAppState } from '@app/store/states/app.state';
import { selectHost } from '@app/store/selectors/etcd.selector';

@Injectable({
  providedIn: 'root'
})
export class EtcdService {

  constructor(
    private http: HttpClient,
    private store: Store<IAppState>,
  ) { }

  testConnection(host: EtcdHost): Observable<EtcdHost> {
    return this.http.post<any>(
      `${host.url}/maintenance/status`,
      {},
    ).pipe(map(response => host));
  }

  loadKV(host: EtcdHost, prefix): Observable<Array<KV>> {
    return this.http.post<any>(
      `${host.url}/kv/range`,
      {
        key: Base64.encode(prefix),
        range_end: Base64.encode('\0'),
      },
    ).pipe(
      map(response => response.kvs.map(rawKV => ({
        key: Base64.decode(rawKV.key),
        value: Base64.decode(rawKV.value),
      } as KV))),
    );
  }

  setKV(host: EtcdHost, kv: KV) {
    return this.http.post<any>(
      `${host.url}/kv/put`,
      {
        key: Base64.encode(kv.key),
        value: Base64.encode(kv.value),
      },
    );
  }

  deleteKV(host: EtcdHost, key: string) {
    return this.http.post<any>(
      `${host.url}/kv/deleterange`,
      {
        key: Base64.encode(key),
        range_end: Base64.encode('\0'),
      },
    );
  }
}
