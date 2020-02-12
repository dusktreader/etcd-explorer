import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { select, Store } from '@ngrx/store';

import { combineLatest, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { IAppState } from '@app/store/states/app.state';
import { createKV } from '@app/store/actions/etcd.action';

@Component({
  selector: 'app-new-dialog',
  templateUrl: './new-dialog.component.html',
  styleUrls: ['./new-dialog.component.scss'],
})
export class NewDialogComponent implements OnInit {
  newForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public prefix: string,
    public dialogRef: MatDialogRef<NewDialogComponent>,
    private store: Store<IAppState>,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.newForm = this.formBuilder.group({
      key: ['', Validators.required],
      value: ['', Validators.required],
    });
  }

  create() {
    this.store.dispatch(createKV({
      key: `${this.prefix}${this.newForm.controls.key.value}`,
      value: this.newForm.controls.value.value,
    }));
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }
}
