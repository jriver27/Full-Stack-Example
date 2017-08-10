import { Component } from '@angular/core';
import { Sample } from '../../models/sample';
import { SampleService } from '../../services/sample.service';
import { OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'my-samples',
  templateUrl: './samples.component.html',
  styleUrls: ['./samples.component.scss', '../../app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SamplesComponent implements OnInit {
  samples: Sample[];
  selectedSample: Sample;
  tableColumns: any[];

  constructor(private sampleService: SampleService, private router: Router) { }

  ngOnInit(): void {
    this.getSamples();
  }

  getSamples(): void {
    this.sampleService
      .getSamples()
      .then(samples => {
        this.tableColumns = [
          { field: 'SampleId', header: 'Sample ID' },
          { field: 'CreatedAt', header: 'Creation Date' },
          { field: 'FirstName', header: 'First Name' },
          { field: 'LastName', header: 'Last Name' },
          { field: 'Status', header: 'Status' }
        ];
        this.samples = samples;
      });
  }

  handleRowSelect(event): void {
    this.router.navigateByUrl(`/detail/${event.data.SampleId}`);
  }

  createSample(): void {
    this.router.navigateByUrl(`/samples/create`);
  }
};
