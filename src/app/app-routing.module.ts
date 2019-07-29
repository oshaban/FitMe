import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importing components to register in router:
import { HomeComponent } from './pages/home/home.component';

// Registering components in router:
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
