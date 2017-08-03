import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SampleService } from '../../services/sample.service';
import { User } from 'app/models/users';
import * as _ from 'lodash';
// import { DataListModule } from 'primeng/primeng';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  topUser: User;
  topUsers = [];

  constructor(private SampleService: SampleService) {};

  ngOnInit(): void {
    this.getTopUsers();
  }

  getTopUsers(): void {
    let maxLenght = 0;

    this.SampleService
      .getSamples()
      .then(samples => {
        const usersList: User[] = [];

        samples.forEach(element => {
          usersList.push({FirstName: element.FirstName,  LastName: element.LastName});
        });

        const groupedUserArray = _.groupBy(usersList, 'FirstName');
        const keys = _.keys(groupedUserArray);
        const values = _.values(groupedUserArray);

        const groupedUserArrayByLength = _.groupBy(groupedUserArray, array => {
           return array.length;
         });

         const groupedByLengthKeys = _.reverse(_.keys(groupedUserArrayByLength));

         _.forEach(groupedByLengthKeys, key => {

            _.each(groupedUserArrayByLength[key], arr => {
              if(this.topUsers.length === 5) {
                return;
              } else {
                this.topUsers.push({
                    FirstName: arr[0].FirstName,
                    LastName: arr[0].LastName,
                    SampleCount: arr.length
                  });
              }
            });
         });
      });
  }
}