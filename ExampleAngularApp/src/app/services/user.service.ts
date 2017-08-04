import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { User } from 'app/models/users';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    getUser(id: number): Promise<User[]> {

        return new Promise<User[]>(((resolve, reject) => {
            this.http
                .get(`http://localhost:49909/api/user/${id}`)
                .map(res => res.json())
                .subscribe((data) => resolve(data));
        }));
    };
}
