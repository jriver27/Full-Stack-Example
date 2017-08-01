import { Component, Input } from '@angular/core';
import { Sample } from '../../models/sample';

@Component({
  selector: 'sample-detail',
  templateUrl: './sample-detail.component.html'
})
export class SampleDetailComponent {
  @Input()sample: Sample;
}