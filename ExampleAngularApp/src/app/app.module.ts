import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SamplesComponent } from './components/samples/samples.component';
import { SampleDetailComponent } from './components/sample-detail/sample-detail.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { SampleService } from './services/sample.service';
import { RouterModule} from '@angular/router';

import {TabMenuModule} from 'primeng/primeng';

import '../../node_modules/primeng/resources/themes/omega/theme.css';
import '../../node_modules/primeng/resources/primeng.min.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import { TabViewModule } from 'primeng/components/tabview/tabview';
import { CodeHighlighterModule } from 'primeng/components/codehighlighter/codehighlighter';
import { DataListModule } from 'primeng/primeng';

@NgModule({
  declarations: [
    AppComponent,
    SamplesComponent,
    SampleDetailComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'samples',
        component: SamplesComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'detail/:id',
        component: SampleDetailComponent
      }]),
  TabMenuModule,
  TabViewModule,
  CodeHighlighterModule,
  DataListModule
],
  providers: [ SampleService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
