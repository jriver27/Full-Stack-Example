import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Prime Imports
import { SharedModule, DataTableModule, TabMenuModule } from 'primeng/primeng';
import { DataListModule, MessagesModule, ButtonModule, DropdownModule, InputTextModule } from 'primeng/primeng';
import '../../node_modules/primeng/resources/primeng.min.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import { TabViewModule } from 'primeng/components/tabview/tabview';
import { CodeHighlighterModule } from 'primeng/components/codehighlighter/codehighlighter';

// Our Component Imports
import { AppComponent } from './app.component';
import { SamplesComponent } from './components/samples/samples.component';
import { SampleDetailComponent } from './components/sample-detail/sample-detail.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserDetailComponent } from 'app/components/user-detail/user-detail.component';
import { SampleService } from './services/sample.service';
import { UserService } from 'app/services/user.service';
import { UsersComponent } from 'app/components/users/users.component';
import { StatusService } from 'app/services/status.service';
import { NewSampleComponent } from 'app/components/new-sample/new-sample.component';
import { NumbersOnlyDirective } from '../directives/numbersOnly.directive';

@NgModule({
  declarations: [
    AppComponent,
    SamplesComponent,
    SampleDetailComponent,
    DashboardComponent,
    UserDetailComponent,
    UsersComponent,
    NewSampleComponent,
    NumbersOnlyDirective
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
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'detail/:id',
        component: SampleDetailComponent
      },
      {
        path: 'user/:id',
        component: UserDetailComponent
      },
      {
        path: 'samples/create',
        component: NewSampleComponent
      }]),
    TabMenuModule,
    TabViewModule,
    CodeHighlighterModule,
    DataListModule,
    SharedModule,
    DataTableModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    BrowserAnimationsModule,
    MessagesModule
  ],
  providers: [SampleService, UserService, StatusService],
  bootstrap: [AppComponent]
})
export class AppModule { }
