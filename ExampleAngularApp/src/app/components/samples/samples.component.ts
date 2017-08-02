import { Component } from '@angular/core';
import { Sample } from '../../models/sample';
import { SampleService } from '../../services/sample.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'my-samples',
  moduleId: module.id,
  templateUrl: './samples.component.html',
  styleUrls: ['./samples.component.scss'],
  providers: []
})
export class SamplesComponent implements OnInit {
  samples: Sample[];

  selectedSample: Sample;

  constructor (private sampleService: SampleService){}

  ngOnInit(): void {
    this.getSamples();
  }

  getSamples(): void {
    this.sampleService
      .getSamples()
      .then(samples => this.samples = samples);
  }

  onSelect(sample: Sample): void {
    this.selectedSample = sample;
  }
};
