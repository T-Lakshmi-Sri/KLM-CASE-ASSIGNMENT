import {async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {StatisticDataService} from '../statisticData/statistic-data.service';
import {StatisticsComponent} from './statistics.component';

const statisticData = {
  requestCount: 12
};
class MockStatistics {
  public getStatisticData() {
    return statisticData;
  }
}

describe('StatisticsComponent', () => {
  let component: StatisticsComponent;
  let statisticDataService: StatisticDataService;
  let fixture: ComponentFixture<StatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StatisticsComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {provide: StatisticDataService, useClass: MockStatistics}
      ]
    })
      .compileComponents();
    statisticDataService = TestBed.get(StatisticDataService);
    // spyOn(statisticDataService, 'getStatistics').and.callThrough();
   // spyOn(statisticDataService, 'getStatisticData').and.returnValue(statisticData);
    const spy = spyOn(statisticDataService, 'getStatistics').and.callFake(() => {
      return ([statisticData]);
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsComponent);
    component = fixture.componentInstance;
    fixture.componentInstance.getContentData();
    fixture.detectChanges();
  });

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBe(this.statisticData);
    // expect(component).toBeTruthy();
  });

  });
