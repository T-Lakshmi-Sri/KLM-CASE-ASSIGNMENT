import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AirlineDataService} from './airline-data.service';

describe('AirlineDataService', () => {
  let airlineDataService: AirlineDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AirlineDataService]
    });
    airlineDataService = TestBed.get(AirlineDataService);
    httpMock = TestBed.get(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });
  it('should retrieve airLineData', () => {
    const airlineData = [{
      airline: 'LOW',
      airlineName: 'Lowela international'
    }];
    airlineDataService.getAirLineData().subscribe(airlineValues => {
      expect(airlineValues).toBeDefined();
    });
    const request = httpMock.expectOne(airlineDataService.airportDetailsUrl);
    expect(request.request.method).toBe('GET');
    request.flush(airlineData);
  });
  it('should retrieve airLineFare', () => {
    const originCode = 'YOW';
    const destinationCode = 'BOA';
    const airlineData = [{
      amount: 474.19,
      currency: 'USD',
      origin: 'YOW',
      destination: 'BBA'
    }];
    airlineDataService.retrieveFare(originCode, destinationCode).subscribe(airlineFare => {
      expect(airlineFare).toBeDefined();
    });
    const request = httpMock.expectOne(airlineDataService.retrieveFareURL + '/YOW/BOA');
    expect(request.request.method).toBe('GET');
    request.flush(airlineData);
  });
});
