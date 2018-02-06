import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginService } from './login/login.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ReservationService } from './reservation/reservation.service';
import { DashboardproComponent } from './dashboardpro/dashboardpro.component';
import { ResourcesComponent } from './resources/resources.component';
import { ActivereservationsComponent } from './activereservations/activereservations.component';
import { HistoryComponent } from './history/history.component';
import { OperatorComponent } from './operator/operator.component';
import { StatisticsComponent } from './statistics/statistics.component';

const appRoutes: Routes = [
  {path: '', component: LoginComponent, pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard', component: DashboardComponent, children: [
    {path: 'reservation', component: ReservationComponent, outlet: 'dashboard'},
    {path: 'active', component: ActivereservationsComponent, outlet: 'dashboard'},
    {path: 'history', component: HistoryComponent, outlet: 'dashboard'}
  ]},
  {path: 'dashboardpro', component: DashboardproComponent, children: [
    {path: 'resources', component: ResourcesComponent, outlet: 'dashboardpro'},
    {path: 'statistics', component: StatisticsComponent, outlet: 'dashboardpro'},
    {path: 'operator', component: OperatorComponent, outlet: 'dashboardpro'}
  ]}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ReservationComponent,
    DashboardproComponent,
    ResourcesComponent,
    ActivereservationsComponent,
    HistoryComponent,
    OperatorComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [LoginService, ReservationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
