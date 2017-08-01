import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SamplesComponent } from './components/samples/samples.component';
import { SampleDetailComponent } from './components/sample-detail/sample-detail.component';

import { SampleService } from './services/sample.service';

@NgModule({
  declarations: [
    AppComponent,
    SamplesComponent,
    SampleDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ SampleService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
