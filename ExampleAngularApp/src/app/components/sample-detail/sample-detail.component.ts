import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Sample } from '../../models/sample';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { SampleService } from '../../services/sample.service';
import { User } from 'app/models/users';
import { Status } from 'app/models/status';
import { UserService } from 'app/services/user.service';
import { StatusService } from 'app/services/status.service';
import * as _ from 'lodash';

@Component({
  selector: 'sample-detail',
  templateUrl: './sample-detail.component.html',
  styleUrls: ['./sample-detail.component.scss', '../../app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SampleDetailComponent implements OnInit {
  @Input() sample: Sample;
  editMode = false;
  selectedUser: any;
  selectedStatus: any;
  users: any[];
  statuses: any[];

  constructor(
    private sampleService: SampleService,
    private userService: UserService,
    private statusService: StatusService,
    private route: ActivatedRoute
  ) { };

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.sampleService.getSample(+params.get('id')))
      .subscribe(sample => {
        this.sample = sample;
      });
  }

  edit(event): void {
    Promise.all([this.userService.getUser(null), this.statusService.getStatuses()])
      .then(values => {
        console.log(values);

        this.users = _.map(values[0], user => {
          return { label: `${user.FirstName} ${user.LastName}`, value: user.UserId };
        }); // users

        this.statuses = _.map(values[1], status => {
          return { label: status.Status, value: status.StatusId };
        }); // statuses

        this.editMode = !this.editMode;
      });
  }

  save(event): void {
    this.editMode = !this.editMode;
  }

  cancel(ecent): void {
    this.editMode = false;
  }

  delete(event): void {
    this.editMode = false;
  }
}
