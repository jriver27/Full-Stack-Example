import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Sample } from '../../models/sample';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { SampleService } from '../../services/sample.service';

@Component({
  selector: 'sample-detail',
  templateUrl: './sample-detail.component.html',
  styleUrls: ['./sample-detail.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class SampleDetailComponent implements OnInit {

  constructor(
    private sampleService: SampleService,
    private route: ActivatedRoute
  ) { };

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.sampleService.getSample(+params.get('id')))
      .subscribe(sample => {
        this.sample = sample;
      });
  }

  @Input() sample: Sample;
}
