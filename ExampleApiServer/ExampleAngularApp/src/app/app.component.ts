import { Component } from '@angular/core';
import { Sample } from './models/sample';
import { SampleService } from './services/sample.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SampleService]
})
export class AppComponent implements OnInit {
  title = 'app works!';
  samples: Sample[];

  selectedSample: Sample; 

  constructor (private sampleService: SampleService){}

  ngOnInit(): void {
    this.getSamples();
  }

  getSamples(): void {
    this.sampleService.getSamples().then(samples => this.samples = samples);
  }

  onSelect(sample: Sample): void {
    this.selectedSample = sample;
  }
}
