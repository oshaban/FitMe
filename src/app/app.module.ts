import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http'; // Used for APIs

/* Components */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { StatsComponent } from './pages/stats/stats.component';

/* Dialog boxes */
import { DeleteDialogComponent } from './dialogs/delete/delete.dialog.component';
import { EditDialogComponent } from './dialogs/edit/edit.dialog.component';
import { AddDialogComponent } from './dialogs/add/add.dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';

/* Angular material: https://material.angular.io/*/
import {
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatNativeDateModule,
  MatSelectModule,
} from '@angular/material';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';

/* Chart js */
import { ChartsModule } from '../../node_modules/ng2-charts';
import { MacroDonoughtChartComponent } from './charts/macro-doughnut-chart/macro-doughnut-chart.component';
import { DateTrackingChartComponent } from './charts/date-tracking-chart/date-tracking-chart.component';
import { StatboxComponent } from './statbox/statbox.component';

/* Ngx Charts */
import { NgxChartsModule } from '@swimlane/ngx-charts';


/* Forms */
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';

/* Table */
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator'

/* Font Awesome */
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MacrotableComponent } from './charts/macrotable/macrotable.component';
import { MacroStatBoxComponent } from './charts/macro-stat-box/macro-stat-box.component';
import { GoalChartComponent } from './charts/goal-chart/goal-chart.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { CheckInComponent } from './pages/checkin/checkin.component';
import { AuthGuardService } from './core/auth-guard.service';
import { DataService } from './core/data.service';
import { GoaltableComponent } from './charts/goaltable/goaltable.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StatsComponent,
    MacroDonoughtChartComponent,
    DateTrackingChartComponent,
    StatboxComponent,
    SignupComponent,
    LoginComponent,
    MacrotableComponent,
    MacroStatBoxComponent,
    GoalChartComponent,
    PageNotFoundComponent,
    CheckInComponent,
    AddDialogComponent,
    DeleteDialogComponent,
    EditDialogComponent,
    GoaltableComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    ChartsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    FontAwesomeModule,
    MatTableModule,
    NgxChartsModule,
    MatPaginatorModule,
    FormsModule,
    MatDialogModule,
    MatSortModule
  ],
  providers: [
    Title,
    MatDatepickerModule,
    AuthGuardService,
    DataService
  ],
  entryComponents: [
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
