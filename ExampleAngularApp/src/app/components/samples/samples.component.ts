import { Component } from '@angular/core';
import { Sample } from '../../models/sample';
import { SampleService } from '../../services/sample.service';
import { OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'my-samples',
  templateUrl: './samples.component.html',
  styleUrls: ['./samples.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SamplesComponent implements OnInit {
  samples: Sample[];

  selectedSample: Sample;

  constructor (private sampleService: SampleService, private router: Router) {}

  ngOnInit(): void {
    this.getSamples();
  }

  getSamples(): void {
    this.sampleService
      .getSamples()
      .then(samples => this.samples = samples);
  }

  onSelect(sample: Sample): void {
    this.router.navigateByUrl(`/detail/${sample.SampleId}`);
  }
};
