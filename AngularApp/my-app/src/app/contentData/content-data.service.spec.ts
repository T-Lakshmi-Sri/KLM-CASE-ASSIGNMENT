import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ContentDataService} from './content-data.service';

describe('ContentDataService', () => {
  let contentDataService: ContentDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContentDataService]
    });
    contentDataService = TestBed.get(ContentDataService);
    httpMock = TestBed.get(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });
  it('should retrieve content', () => {
    const contentData = [{
      search: 'search',
    }];
    contentDataService.getContent().subscribe(contentdata => {
      expect(contentdata).toBeDefined();
    });
    const request = httpMock.expectOne(contentDataService.contentURL);
    expect(request.request.method).toBe('GET');
    request.flush(contentData);
  });
  it('should retrieve content', () => {
    const contentData = null;
    contentDataService.getContent().subscribe(contentValues => {
      expect(contentValues).toBeNull();
    });
    const request = httpMock.expectOne(contentDataService.contentURL);
    expect(request.request.method).toBe('GET');
    request.flush(contentData);
  });
});
