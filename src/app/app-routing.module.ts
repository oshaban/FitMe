import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importing components to register in router:
import { HomeComponent } from './pages/home/home.component';
import { StatsComponent } from './pages/stats/stats.component';

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
  { path: '**', component: HomeComponent } /* Wild-card route */

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
