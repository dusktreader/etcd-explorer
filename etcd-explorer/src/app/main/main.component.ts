import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatDialog,
  Sort,
} from '@angular/material';
import { map, tap, filter } from 'rxjs/operators';

import { connect, disconnect, loadKV } from '@app/store/actions/etcd.action';
import { IAppState } from '@app/store/states/app.state';
import { selectHost, selectHostNow, selectKVs } from '@app/store/selectors/etcd.selector';
import { selectNow } from '@app/store/selectors/timer.selector';
import { EtcdService } from '@app/services/etcd.service';
import { EtcdHost } from '@app/models/etcd-host.model';
import { KV } from '@app/models/kvs.model';

import { EditDialogComponent } from '@app/main/edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  connectForm: FormGroup;
  connected$: Observable<boolean>;

  public noData: boolean;
  public dataSource = new MatTableDataSource<KV>();
  displayedColumns = ['key', 'value' ];  // lastUpdated?
  paginatorSettings = {
    pageSize: 25,
    pageSizeOptions: [5, 10, 25, 50, 100],
  };

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private store: Store<IAppState>,
    private formBuilder: FormBuilder,
    private etcdService: EtcdService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.noData = true;
    this.connectForm = this.formBuilder.group({
      hostname: ['localhost', Validators.required],
      port: ['2379', Validators.required],
    });
    this.store.pipe(
      select(selectHostNow),
      filter(({host, now}) => !!host),
    ).subscribe(
      ({host, now}) => {
        this.store.dispatch(loadKV({host, prefix: 'pa'}));
      },
    );
    this.connected$ = this.store.pipe(
      select(selectHost),
      map(host => !!host),
    );

    this.store.pipe(
      select(selectKVs),
      map(kvs => !kvs ? [] : kvs),
    ).subscribe(kvs => {
      this.dataSource.data = kvs;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.noData = kvs.length === 0;
    });
  }

  connect() {
    this.store.dispatch(connect(new EtcdHost({
      hostname: this.connectForm.get('hostname').value,
      port: this.connectForm.get('port').value,
    })));
  }

  disconnect() {
    this.store.dispatch(disconnect());
  }

  tweak(kv: KV) {
    this.dialog.open(EditDialogComponent, {data: kv});
  }

  drop(key: string) {
  }
}
