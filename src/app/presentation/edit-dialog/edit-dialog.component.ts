import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { select, Store } from '@ngrx/store';

import { combineLatest, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { KV } from '@app/models/kvs.model';
import { IAppState } from '@app/store/states/app.state';
import { setKV, deleteKV } from '@app/store/actions/etcd.action';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss'],
})
export class EditDialogComponent implements OnInit {
  editForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public kv: KV,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    private store: Store<IAppState>,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      value: [this.kv.value, Validators.required],
    });
  }

  update() {
    this.store.dispatch(setKV({
      ...this.kv,
      value: this.editForm.controls.value.value,
    }));
    this.dialogRef.close();
  }

  delete() {
    this.store.dispatch(deleteKV(this.kv.key));
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }
}
