import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importing components to register in router:
import { HomeComponent } from './pages/home/home.component';
import { StatsComponent } from './pages/stats/stats.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { MacroStatBoxComponent } from './charts/macro-stat-box/macro-stat-box.component';
import { DateTrackingChartComponent } from './charts/date-tracking-chart/date-tracking-chart.component';
import { GoalChartComponent } from './charts/goal-chart/goal-chart.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { CheckInComponent } from './pages/checkin/checkin.component';
import { AuthGuardService } from './core/auth-guard.service';
import { ResolverService } from './core/resolver.service';

// Registering components in router:
const routes: Routes = [
  {
    path: '', redirectTo: '/dashboard', pathMatch: 'full'
  },
  {
    path: 'dashboard', component: HomeComponent,
    children: [
      {path: '', component: DateTrackingChartComponent, canActivate: [AuthGuardService]  },
      {path: 'calories', component: MacroStatBoxComponent, canActivate: [AuthGuardService] },
      {path: 'goals', component: GoalChartComponent, canActivate: [AuthGuardService] },
    ],
    canActivate: [AuthGuardService],
    resolve : [ResolverService]
  },
  {
    path: 'stats',
    component: StatsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'checkin',
    component: CheckInComponent,
    canActivate: [AuthGuardService]
  },
  { path: '**', component: PageNotFoundComponent } /* Wild-card route */

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
