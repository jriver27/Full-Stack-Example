import { Component } from '@angular/core';
import { OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from 'app/services/user.service';

import 'rxjs/add/operator/switchMap';
import * as _ from 'lodash';
import { User } from 'app/models/users';
import { Router } from '@angular/router';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['../../app.component.scss', './users.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {
  allUsersData;
  selectedUser: User;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService
      .getAllUsers()
      .then(users => {
        this.allUsersData = _.map(users, (user: any) => {
          let length = 0;
          if (user.SampleIds) {
            length = user.SampleIds.split(',').length;
          }
          user.SampleCount = length;
          return user;
        });
      });
  }

  onRowSelect(event): void {
    this.router.navigateByUrl(`/user/${event.data.UserId}`);
  }
};
