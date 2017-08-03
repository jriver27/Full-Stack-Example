import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SampleService } from '../../services/sample.service';
import { User } from 'app/models/users';
import * as _ from 'lodash';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  topUser: User;
  topUsers: User[] = [];

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

        _.forEach(keys, key => {
          const listLenght = groupedUserArray[key].length;

          if (listLenght > maxLenght){
            maxLenght = listLenght;
          }
        });

        _.forEach(values, userArray => {
          if(userArray.length === maxLenght){
            this.topUsers.push({FirstName: userArray[0].FirstName, LastName: userArray[0].LastName});
          }
        });
      });
  }
}