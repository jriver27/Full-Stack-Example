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
import { SelectItem } from 'primeng/primeng';

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
  selectedBarcode: any;
  allUsers: any[];
  users: SelectItem[];
  statuses: SelectItem[];

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
        this.selectedStatus = sample.StatusId;
        this.selectedUser = sample.UserId;
        this.selectedBarcode = sample.Barcode;
      });
  }

  edit(event): void {
    Promise.all([this.userService.getUser(null), this.statusService.getStatuses()])
      .then(values => {

        this.allUsers = values;

        this.users = _.map(values[0], user => {
          return { label: `${user.FirstName} ${user.LastName}`, value: user.UserId };
        }); // users

        this.statuses = _.map(values[1], status => {
          return { label: status.Status, value: status.StatusId };
        }); // statuses

        this.editMode = !this.editMode;
      });
  }

  private updateUserInformation(userId: number, statusId: number, barcode: number): void {
    const userInfo = _.find(this.users, user => {
      return user.value === userId;
    });

    const statusesInfo = _.find(this.statuses, status => {
      return status.value === statusId;
    });

    const selectedUserFirstName = userInfo.label.split(' ')[0];
    const selectedUserLastName = userInfo.label.split(' ')[1];

    this.sample.FirstName = selectedUserFirstName;
    this.sample.LastName = selectedUserLastName;
    this.sample.Barcode = barcode;
    this.sample.Status = statusesInfo.label;
    this.sample.StatusId = statusId;
    this.sample.CreatedBy = userId;

    this.sampleService.updateSample(this.sample).then();
  };

  save(event): void {
    this.updateUserInformation(this.selectedUser, this.selectedStatus, this.selectedBarcode);
    this.editMode = !this.editMode;
  }

  cancel(event): void {
    this.editMode = false;
  }

  delete(event): void {
    this.editMode = false;
  }
}
