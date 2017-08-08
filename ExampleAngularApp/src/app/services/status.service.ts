import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Status } from '../models/status';

import 'rxjs/Rx';

@Injectable()
export class StatusService {
    constructor(private http: Http) { }

    getStatuses(): Promise<Status[]> {

        return new Promise<Status[]>(((resolve, reject) => {
            this.http
                .get('http://localhost:49909/api/status')
                .map(res => res.json())
                .subscribe((data) => resolve(data));
        }));
    };
}
