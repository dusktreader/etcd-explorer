import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatTabsModule,
  MatExpansionModule,
  MatGridListModule,
  MatDialogModule,
  MatTableModule,
  MatPaginatorModule,
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MainComponent } from '@app/main/main.component';
import { EditDialogComponent } from '@app/main/edit-dialog/edit-dialog.component';

import { reducer as etcdReducer } from '@app/store/reducers/etcd.reducer';
import { reducer as timerReducer } from '@app/store/reducers/timer.reducer';
import { Effects as EtcdEffects } from '@app/store/effects/etcd.effect';
import { Effects as TimerEffects } from '@app/store/effects/timer.effect';

import { EtcdService } from '@app/services/etcd.service';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    EditDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      etcd: etcdReducer,
      timer: timerReducer,
    }),
    EffectsModule.forRoot([
      EtcdEffects,
      TimerEffects,
    ]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,

    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTabsModule,
    MatExpansionModule,
    MatGridListModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  providers: [
    EtcdService,
  ],
  entryComponents: [
    EditDialogComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
