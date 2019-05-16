import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {StatisticDataService} from './statistic-data.service';

describe('StatisticDataService', () => {
  let statisticDataService: StatisticDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StatisticDataService]
    });
    statisticDataService = TestBed.get(StatisticDataService);
    httpMock = TestBed.get(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });
  it('should retrieve statistics', () => {
    const statisticData = [{
      requestCount: 20,
    }];
    statisticDataService.getStatistics().subscribe(statisticdata => {
      expect(statisticdata).toBeDefined();
    });
    const request = httpMock.expectOne(statisticDataService.statisticsUrl);
    expect(request.request.method).toBe('GET');
    request.flush(statisticData);
  });
  it('should not retrieve statistics', () => {
    const statisticData = null;
    statisticDataService.getStatistics().subscribe(statisticdata => {
      expect(statisticdata).toBeNull();
    });
    const request = httpMock.expectOne(statisticDataService.statisticsUrl);
    expect(request.request.method).toBe('GET');
    request.flush(statisticData);
  });
});
