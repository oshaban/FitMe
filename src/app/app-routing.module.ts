import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importing components to register in router:
import { HomeComponent } from './pages/home/home.component';
import { StatsComponent } from './pages/stats/stats.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';

// Registering components in router:
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
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
  { path: '**', component: HomeComponent } /* Wild-card route */

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
