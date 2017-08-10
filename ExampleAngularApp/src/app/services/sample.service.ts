import { Injectable } from '@angular/core';
import { Sample } from '../models/sample';
import { SAMPLES } from './mock-samples';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class SampleService {
    constructor(private http: Http) { }

    getSamples(): Promise<Sample[]> {

        return new Promise<Sample[]>(((resolve, reject) => {
            this.http
                .get('http://localhost:49909/api/samples')
                .map(res => res.json())
                .subscribe((data) => resolve(data));
        }));
    };

    getSample(id: number): Promise<Sample> {
        return this.getSamples()
            .then(samples => samples.find(sample => sample.SampleId === id));
    };

    updateSample(sample: Sample): Promise<Sample> {
        return new Promise<Sample>((resolve, reject) => {
            this.http
                .post('http://localhost:49909/api/samples/edit', sample)
                .map(res => res.json())
                .subscribe((data) => resolve(data));
        });
    };

    createSample(sample: Sample): Promise<Sample> {
        return new Promise<Sample>((resolve, reject) => {
            this.http
                .post('http://localhost:49909/api/samples/create', sample)
                .map(res => res.json())
                .subscribe((data) => resolve(data));
        });
    }

    deleteSample(sample: Sample): Promise<Sample> {
        return new Promise<Sample>((resolve, reject) => {
            this.http
                .delete('http://localhost:49909/api/samples', new RequestOptions({
                    body: sample
                }))
                .map(res => res.json())
                .subscribe(data => resolve(data));
        });
    };
}
