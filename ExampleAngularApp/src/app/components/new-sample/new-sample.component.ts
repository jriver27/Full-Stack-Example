import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { SampleService } from 'app/services/sample.service';

@Component({
    selector: 'new-sample',
    templateUrl: './new-sample.component.html',
    styleUrls: ['./new-sample.component.scss', '../../app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NewSampleComponent implements OnInit {
    ngOnInit(): void {

    }

    constructor(private sampleService: SampleService) {

    }


};