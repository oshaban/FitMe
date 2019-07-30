import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http'; // Used for APIs

/* Components */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './footer/footer.component';
import { StatsComponent } from './pages/stats/stats.component';

/* Angular material: https://material.angular.io/*/
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule, MatCardModule } from '@angular/material';

/* Chart js */
import { ChartsModule } from '../../node_modules/ng2-charts';
import { MacroDonoughtChartComponent } from './charts/macro-doughnut-chart/macro-doughnut-chart.component';
import { DateTrackingChartComponent } from './charts/date-tracking-chart/date-tracking-chart.component';
import { StatboxComponent } from './statbox/statbox.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    StatsComponent,
    MacroDonoughtChartComponent,
    DateTrackingChartComponent,
    StatboxComponent,
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
    ChartsModule
  ],
  providers: [
    Title,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
