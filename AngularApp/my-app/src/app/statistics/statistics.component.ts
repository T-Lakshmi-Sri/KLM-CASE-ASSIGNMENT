import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {StatisticDataService} from '../statisticData/statistic-data.service';
import {ContentDataService} from '../contentData/content-data.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  statisticData: any;
  showTable: boolean;
  requestCount: any;
  totalResponseTimeMillis: number;
  maxResponseTimeMillis: number;
  requestCountValues: [];
  requestCount200Values: [];
  request4XXCountValues: [];
  request5XXCountValues: [];
  request200Count: any;
  request4XXCount: any;
  request5XXCount: any;
  avgRequestTime: any;
  minRequestTime: number;
  content: any;
  error: 'Please try again';

  constructor(private statisticDataService: StatisticDataService, private contentDataService: ContentDataService, private router: Router) {
    this.getContentData();
  }

  ngOnInit() {
    this.statisticDataService.getStatistics()
      .subscribe((data: any) => {
        if (data) {
          this.requestCount200Values = [];
          this.request4XXCountValues = [];
          this.request5XXCountValues = [];
          this.statisticData = data;
          this.showTable = true;
          this.requestCount = data.measurements[0].value;
          this.totalResponseTimeMillis = data.measurements[1].value;
          this.maxResponseTimeMillis = data.measurements[2].value;
          this.minRequestTime = -this.maxResponseTimeMillis;
          this.requestCountValues = data.availableTags[4].values;
          for (let i = 0; i < this.requestCountValues.length; i++) {
            if (this.requestCountValues[i] >= 200 && this.requestCountValues[i] < 400) {
              this.requestCount200Values.push(this.requestCountValues[i]);
            }
            if (this.requestCountValues[i] >= 400 && this.requestCountValues[i] < 500) {
              this.request4XXCountValues.push(this.requestCountValues[i]);
            }
            if (this.requestCountValues[i] >= 500) {
              this.request5XXCountValues.push(this.requestCountValues[i]);
            }
          }
          this.request200Count = this.requestCount200Values.length;
          this.request4XXCount = this.request4XXCountValues.length;
          this.request5XXCount = this.request5XXCountValues.length;
          this.avgRequestTime = this.totalResponseTimeMillis / 2;
        }
      },
        error => this.error = error);
  }

  getContentData() {
    this.contentDataService.getContent()
      .subscribe((data: any) => {
        if (data) {
          this.content = data;
        }
      },  error => this.error = error);
  }

  navigateToStatistics() {
    this.router.navigate(['statistics']);
  }

  navigateToSearch() {
    this.router.navigate(['airlines']);
  }

}
