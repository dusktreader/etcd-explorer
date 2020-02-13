import { Component, OnInit , ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { connect, disconnect } from '@app/store/actions/etcd.action';
import { IAppState } from '@app/store/states/app.state';
import { selectHost } from '@app/store/selectors/etcd.selector';
import { EtcdHost } from '@app/models/etcd-host.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('panel', { static: false }) Panel: MatExpansionPanel;

  connectForm: FormGroup;
  connected$: Observable<boolean>;
  host$: Observable<EtcdHost>;
  titleString$: Observable<string>;

  constructor(
    private store: Store<IAppState>,
    private formBuilder: FormBuilder,
  ) {}


  ngOnInit() {
    this.connectForm = this.formBuilder.group({
      hostname: ['localhost', Validators.required],
      port: ['2379', Validators.required],
    });
    this.host$ = this.store.pipe(
      select(selectHost),
    );
    this.connected$ = this.host$.pipe(
      map(host => !!host),
    );
    this.titleString$ = this.host$.pipe(
      map(host => {
        if (!host) {
          return 'Not Connected...';
        } else {
          return `Connected to ${host.hostname}:${host.port}`;
        }
      }),
    );
  }

  connect() {
    this.store.dispatch(connect(new EtcdHost({
      hostname: this.connectForm.get('hostname').value,
      port: this.connectForm.get('port').value,
    })));
    this.Panel.close();
  }

  disconnect() {
    this.store.dispatch(disconnect());
    this.Panel.close();
  }
}
