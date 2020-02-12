import { Component, OnInit, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material';
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

import { loadKV } from '@app/store/actions/etcd.action';
import { IAppState } from '@app/store/states/app.state';
import { selectHostNow, selectKVs } from '@app/store/selectors/etcd.selector';
import { EtcdHost } from '@app/models/etcd-host.model';
import { KV } from '@app/models/kvs.model';

import { EditDialogComponent } from '@app/presentation/edit-dialog/edit-dialog.component';
import { NewDialogComponent } from '@app/presentation/new-dialog/new-dialog.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

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
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.noData = true;
    this.store.pipe(
      select(selectHostNow),
      filter(({host, now}) => !!host),
    ).subscribe(
      ({host, now}) => {
        this.store.dispatch(loadKV({host, prefix: 'pa'}));
      },
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

  add() {
    this.dialog.open(NewDialogComponent);
  }

  tweak(kv: KV) {
    this.dialog.open(EditDialogComponent, {data: kv});
  }

  drop(key: string) {}
}
