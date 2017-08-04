import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

// Prime Imports
import { SharedModule, DataTableModule, TabMenuModule, DataListModule, DataTable } from 'primeng/primeng';
import '../../node_modules/primeng/resources/themes/omega/theme.css';
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

@NgModule({
  declarations: [
    AppComponent,
    SamplesComponent,
    SampleDetailComponent,
    DashboardComponent,
    UserDetailComponent,
    UsersComponent
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
      }]),
    TabMenuModule,
    TabViewModule,
    CodeHighlighterModule,
    DataListModule,
    SharedModule,
    DataTableModule
  ],
  providers: [SampleService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
