import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { select, Store } from '@ngrx/store';

import { IAppState } from '@app/store/states/app.state';
import { createKV } from '@app/store/actions/etcd.action';
import { selectPrefix } from '@app/store/selectors/etcd.selector';

@Component({
  selector: 'app-new-dialog',
  templateUrl: './new-dialog.component.html',
  styleUrls: ['./new-dialog.component.scss'],
})
export class NewDialogComponent implements OnInit {
  newForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<NewDialogComponent>,
    private store: Store<IAppState>,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.newForm = this.formBuilder.group({
      key: ['', Validators.required],
      value: ['', Validators.required],
    });
    this.store.pipe(select(selectPrefix)).subscribe(
      prefix => this.newForm.controls.key.setValue(prefix)
    );
  }

  create() {
    this.store.dispatch(createKV({
      key: this.newForm.controls.key.value,
      value: this.newForm.controls.value.value,
    }));
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }
}
