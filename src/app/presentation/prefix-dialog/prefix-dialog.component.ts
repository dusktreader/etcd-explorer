import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { select, Store } from '@ngrx/store';

import { IAppState } from '@app/store/states/app.state';
import { setPrefix } from '@app/store/actions/etcd.action';
import { selectPrefix } from '@app/store/selectors/etcd.selector';

@Component({
  selector: 'app-prefix-dialog',
  templateUrl: './prefix-dialog.component.html',
  styleUrls: ['./prefix-dialog.component.scss'],
})
export class PrefixDialogComponent implements OnInit {
  prefixForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<PrefixDialogComponent>,
    private store: Store<IAppState>,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.prefixForm = this.formBuilder.group({
      prefix: ['', Validators.required],
    });
    this.store.pipe(select(selectPrefix)).subscribe(
      prefix => this.prefixForm.controls.prefix.setValue(prefix)
    );
  }

  setPrefix() {
    this.store.dispatch(setPrefix(this.prefixForm.controls.prefix.value));
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }
}
