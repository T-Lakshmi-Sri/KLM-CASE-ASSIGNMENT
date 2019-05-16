import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AirlineDataService} from '../airlineData/airline-data.service';
import {ContentDataService} from '../contentData/content-data.service';


export interface User {
  code: string;
  name: string;
}

@Component({
  selector: 'app-klm',
  templateUrl: './klm.component.html',
  styleUrls: ['./klm.component.scss']
})
export class KlmComponent implements OnInit {

  myOriginControl = new FormControl();
  myDestinationControl = new FormControl();
  originOptions: any[];
  destinationOptions: any[];
  initialOptions: any[];
  originCode: string;
  destCode: string;
  airlineFare: string;
  airlineCurrency: string;
  airLineFareData: boolean;
  airLineFareValid: boolean;
  content: any;
  error: 'Please try again';

  constructor(private airlineDataService: AirlineDataService, private contentDataService: ContentDataService, private router: Router) {

  }

  displayFn(user?: User): string | undefined {
    return user ? user.name : undefined;
  }

  ngOnInit() {
    this.getContentData();
    this.originOptions = [];
    this.destinationOptions = [];
    this.showAirlineData();
    this.myOriginControl.valueChanges
      .pipe(
        startWith<string | any>(''),
        map(value => typeof value === 'string' ? value : value.code),
        map(code => code ? this.originFilter(code) : this.originOptions.slice())
      ).subscribe(response => {
      this.originOptions = response;
    },  error => this.error = error);


    this.originOptions = [];
    this.myDestinationControl.valueChanges
      .pipe(
        startWith<string | any>(''),
        map(value => typeof value === 'string' ? value : value.code),
        map(code => code ? this.destinationFilter(code) : this.destinationOptions.slice())
      ).subscribe(response => {
      this.destinationOptions = response;
    },  error => this.error = error);
  }

  private destinationFilter(code: string): any[] {
    this.airLineFareData = false;
    const filterValue = code.toLowerCase();
    this.destCode = code;
    return this.initialOptions.filter(option =>
      option.code.toLowerCase().indexOf(filterValue) === 0 || option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  private originFilter(code: string): any[] {
    const filterValue = code.toLowerCase();
    this.airLineFareData = false;
    this.originCode = code;
    return this.initialOptions.filter(option =>
      option.code.toLowerCase().indexOf(filterValue) === 0 || option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  getContentData() {
    this.contentDataService.getContent()
      .subscribe((data: any) => {
        if (data) {
          this.content = data;
        }
      },  error => this.error = error);
  }

  showAirlineData() {
    this.originOptions = [];
    this.initialOptions = [];
    this.airlineDataService.getAirLineData()
      .subscribe((data: any) => {
        const airLineDataValue = data;
        this.originOptions = airLineDataValue._embedded.locations;
        this.destinationOptions = airLineDataValue._embedded.locations;
        this.initialOptions = this.originOptions;
      },  error => this.error = error);
  }

  findDeal() {
    this.findDealValidations();
    if (this.airLineFareValid) {
      this.airlineDataService.retrieveFare(this.originCode, this.destCode)
        .subscribe((data: any) => {
          if (data) {
            const airLineFareData = data;
            this.airlineFare = airLineFareData.amount;
            this.airlineCurrency = airLineFareData.currency;
            this.airLineFareData = true;
          }
        },  error => this.error = error);
    }

  }

  findDealValidations() {
    if (this.originCode) {
      if (this.destCode) {
        if (this.originCode !== this.destCode) {
          this.airLineFareValid = true;
        } else {
          alert('Please select different destination from origin');
        }
      } else {
        alert('Please select Destination');
      }
    } else {
      alert('Please select Origin');
    }
  }

  getAirlineDataFare() {
    this.airLineFareData = false;
  }

  navigateToStatistics() {
    this.router.navigate(['statistics']);
  }

  navigateToSearch() {
    this.router.navigate(['airlines']);
  }
}
