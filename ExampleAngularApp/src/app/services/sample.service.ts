import { Injectable } from '@angular/core';
import { Sample } from '../models/sample';
import { SAMPLES } from './mock-samples';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class SampleService {
    constructor(private http: Http) {}

    getSamples(): Promise<Sample[]> {

        return new Promise<Sample[]>(((resolve, reject) => {
            this.http
                .get('http://localhost:49909/api/samples')
                .map(res => res.json())
                .subscribe((data) => resolve(data));
        }));
     };
}
