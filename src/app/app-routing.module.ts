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
import { CheckinComponent } from './pages/checkin/checkin.component';
import { UserResolverService } from './core/user-resolver.service';

// Registering components in router:
const routes: Routes = [
  {
    path: '', redirectTo: '/dashboard', pathMatch: 'full'
  },
  {
    path: 'dashboard', component: HomeComponent, resolve: [UserResolverService],
    children: [
      {path: '', component: DateTrackingChartComponent },
      {path: 'calories', component: MacroStatBoxComponent },
      {path: 'goals', component: GoalChartComponent },
    ]
  },
  {
    path: 'stats',
    component: StatsComponent
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
    component: CheckinComponent
  },
  { path: '**', component: PageNotFoundComponent } /* Wild-card route */

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
