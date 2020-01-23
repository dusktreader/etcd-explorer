import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { connect } from '@app/store/actions/etcd.action';
import { IAppState } from '@app/store/states/app.state';
import { selectHost } from '@app/store/selectors/etcd.selector';
import { EtcdService } from '@app/services/etcd.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  connectForm: FormGroup;

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
  }

  connect() {
    console.log('CONNECT!');
    this.store.dispatch(connect({
      hostname: this.connectForm.get('hostname').value,
      port: this.connectForm.get('port').value,
    }));
  }

}
