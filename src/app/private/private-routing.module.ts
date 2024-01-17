import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../public/layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { DatosComponent } from './datos/datos.component';
import { ComponerComponent } from './componer/componer.component';
import { CalendarComponent } from '../public/components/calendar/calendar.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { AccountingComponent } from './accounting/accounting.component';
import { isAuthenticatedGuard } from '../guards/is-authenticated.guard';
import { DetallePacientesComponent } from './detalle-pacientes/detalle-pacientes.component';

const routes: Routes = [
  {
    path: '',
    // canActivate: [ isAuthenticatedGuard ],
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'usuarios',
        component: UsuariosComponent
      },
      {
        path: 'datos',
        component: DatosComponent
      },
      {
        path: 'componer',
        component: ComponerComponent,
      },
      {
        path: 'calendario',
        component: CalendarComponent,
      },
      {
        path: 'pacientes',
        component: PacientesComponent,
      },
      {
        path: 'detalle/:id',
        component: DetallePacientesComponent,
      },
      {
        path: 'contabilidad',
        component: AccountingComponent,
      },
      {
        path: '**',
        redirectTo: 'home'
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
