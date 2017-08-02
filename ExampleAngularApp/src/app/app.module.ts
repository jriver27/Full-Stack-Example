import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SamplesComponent } from './components/samples/samples.component';
import { SampleDetailComponent } from './components/sample-detail/sample-detail.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { SampleService } from './services/sample.service';
import { RouterModule } from '@angular/router';

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
    RouterModule.forRoot([{
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
  }
])
  ],
  providers: [ SampleService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
