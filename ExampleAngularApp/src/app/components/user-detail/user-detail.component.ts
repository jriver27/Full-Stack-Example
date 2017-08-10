import { Component } from '@angular/core';
import { OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from 'app/services/user.service';
import { User } from 'app/models/users';
import 'rxjs/add/operator/switchMap';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import * as moment from 'moment';
import * as _ from 'lodash';
import { DataTable } from 'primeng/primeng';

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['../../app.component.scss', './user-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserDetailComponent implements OnInit {
  user: User;
  userData;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.userService.getUser(+params.get('id')))
      .subscribe(data => {
        if (data !== null) {
          this.userData = _.map(data, d => {
            if (d.CreatedAt) {
              d.CreatedAt = moment(d.CreatedAt, 'YYYY-MM-DDT').toDate();
              d.DisplayDate = moment(d.CreatedAt, 'YYYY-MM-DDT').format('MM/DD/YYYY');
            }

            return d;
          });
          this.user = data[0];
        }
      });
  };

  mysort(event): void {
    this.userData.sort((a, b) => {
      const formatedA = moment(a.DisplayDate, 'MM/DD/YYYY');
      const formatedB = moment(b.DisplayDate, 'MM/DD/YYYY');
      let result: number = -1;

      if (formatedB.isBefore(formatedA)) {
        result = 1;
      }

      return result * event.order;
    });

    this.userData = [...this.userData];
  }

  onSelect(event): void {
    this.router.navigateByUrl(`/detail/${event.data.SampleID}`);
  }

  goBack(): void {
    this.location.back();
  }
};
