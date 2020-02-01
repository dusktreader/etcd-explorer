import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { Observable, BehaviorSubject, from, of, throwError, combineLatest } from 'rxjs';
import { map, mergeMap, tap, filter } from 'rxjs/operators';
import { Base64 } from 'js-base64';

import { EtcdHost } from '@app/models/etcd-host.model';
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

  // loadKVs(host: EtcdHost, prefix): Observable<Array<any>> | void {
  loadKV(host: EtcdHost, prefix): any {
    return this.http.post<any>(
      `${host.url}/kv/range`,
      {
        key: Base64.encode(prefix),
        range_end: Base64.encode('\0'),
      },
      { observe: 'response' },
    );
  }
}
