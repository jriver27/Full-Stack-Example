import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { SampleService } from 'app/services/sample.service';
import { SelectItem } from 'primeng/primeng';
import { UserService } from 'app/services/user.service';
import { StatusService } from 'app/services/status.service';
import * as _ from 'lodash';
import { Status } from 'app/models/status';
import { User } from 'app/models/users';
import { Sample } from 'app/models/sample';

@Component({
    selector: 'new-sample',
    templateUrl: './new-sample.component.html',
    styleUrls: ['./new-sample.component.scss', '../../app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NewSampleComponent implements OnInit {
    selectStatuses: SelectItem[];
    selectUsers: SelectItem[];
    users: User[];
    statuses: Status[];
    isFormComplete: boolean;
    selectedStatus: number;
    selectedUser: number;
    selectedBarcode: number;
    msgs = [];

    constructor(
        private sampleService: SampleService,
        private userService: UserService,
        private statusService: StatusService) { }

    ngOnInit(): void {
        Promise.all([this.userService.getUser(null), this.statusService.getStatuses()])
            .then(values => {
                this.users = values[0];
                this.statuses = values[1];

                this.selectUsers = [{ label: 'Select User', value: null }, ..._.map(values[0], user => {
                    return { label: `${user.FirstName} ${user.LastName}`, value: user.UserId };
                })]; // users

                this.selectStatuses = [{ label: 'Select Status', value: null }, ..._.map(values[1], status => {
                    return { label: status.Status, value: status.StatusId };
                })]; // statuses
            });
    }

    formChanged(): void {
        this.isFormComplete = Number.isInteger(this.selectedStatus) && Number.isInteger(this.selectedUser) && Boolean(this.selectedBarcode);
    }

    submit(): void {
        const sample: Sample = {
            CreatedBy: this.selectedUser,
            Barcode: this.selectedBarcode,
            StatusId: this.selectedStatus
        };

        this.sampleService.createSample(sample).then((data) => {
            this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Successfully Created Sample' });
            this.cancel();
        });
    }

    cancel(): void {
        this.selectedStatus = null;
        this.selectedUser = null;
        this.selectedBarcode = null;
        this.isFormComplete = false;
    }
};
