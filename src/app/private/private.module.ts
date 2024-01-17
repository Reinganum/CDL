import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrivateRoutingModule } from './private-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ComponerComponent } from './componer/componer.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { DatosComponent } from './datos/datos.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserTableComponent } from './user-table/user-table.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PacientesComponent } from './pacientes/pacientes.component';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { AccountingComponent } from './accounting/accounting.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CalculateAgePipe } from '../pipes/calculate-age.pipe';
import { DetallePacientesComponent } from './detalle-pacientes/detalle-pacientes.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ComponerComponent,
    UsuariosComponent,
    DatosComponent,
    UserTableComponent,
    PacientesComponent,
    AccountingComponent,
    CalculateAgePipe,
    DetallePacientesComponent,
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    PrivateRoutingModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatDatepickerModule,
    
  ]
})
export class PrivateModule { }
