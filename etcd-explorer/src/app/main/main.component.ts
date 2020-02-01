import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';

import { connect, loadKV } from '@app/store/actions/etcd.action';
import { IAppState } from '@app/store/states/app.state';
import { selectHostNow } from '@app/store/selectors/etcd.selector';
import { selectNow } from '@app/store/selectors/timer.selector';
import { EtcdService } from '@app/services/etcd.service';
import { EtcdHost } from '@app/models/etcd-host.model';
import { KV } from '@app/models/kvs.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  connectForm: FormGroup;
  keys$: Observable<Array<KV>>;

  constructor(
    private store: Store<IAppState>,
    private formBuilder: FormBuilder,
    private etcdService: EtcdService,
  ) { }

  ngOnInit() {
    this.connectForm = this.formBuilder.group({
      hostname: ['localhost', Validators.required],
      port: ['2379', Validators.required],
    });
    this.store.pipe(
      select(selectHostNow),
      filter(({host, now}) => !!host),
      tap(fart => { console.log('HOSTNOW? ', fart); }),
    ).subscribe(
      ({host, now}) => this.store.dispatch(loadKV({host, prefix: 'pa'})),
    );
  }

  connect() {
    this.store.dispatch(connect(new EtcdHost({
      hostname: this.connectForm.get('hostname').value,
      port: this.connectForm.get('port').value,
    })));
  }
}
