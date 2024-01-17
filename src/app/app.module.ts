import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DateAdapter, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { CalendarComponent } from './public/components/calendar/calendar.component';
import { FormatTimePipe } from './pipes/format-time.pipe';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddPatientComponent } from './modals/add-patient/add-patient.component';
import { ToastrModule } from 'ngx-toastr';
import { EditSessionComponent } from './modals/edit-session/edit-session.component';
import { ConfirmationComponent } from './modals/confirmation/confirmation.component';
import { NgApexchartsModule } from 'ng-apexcharts';




@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    FormatTimePipe,
    AddPatientComponent,
    EditSessionComponent,
    ConfirmationComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    NgApexchartsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatNativeDateModule,
    MatMenuModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
   /* providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-CL' },
    { 
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [ MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS ]
    },
  ],  */
  bootstrap: [AppComponent]
})
export class AppModule { }
