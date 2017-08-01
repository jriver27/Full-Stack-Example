import { Injectable } from '@angular/core';
import { Sample } from '../models/sample';
import { SAMPLES } from './mock-samples';

@Injectable()
export class SampleService {
     getSamples(): Promise<Sample[]> {
        return Promise.resolve(SAMPLES);
     };
}
