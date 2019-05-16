import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {KlmComponent} from './klm.component';
import {MatInputModule} from '@angular/material';
import {RouterTestingModule} from '@angular/router/testing';
import {AirlineDataService} from '../airlineData/airline-data.service';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

describe('KlmComponent', () => {
  let component: KlmComponent;
  let fixture: ComponentFixture<KlmComponent>;
  let airlineDataService = AirlineDataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KlmComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule, MatAutocompleteModule, MatInputModule, FormsModule],
      providers: [
        KlmComponent,
        {provide: AirlineDataService}
      ]
    })
      .compileComponents();
    component = TestBed.get(KlmComponent);
    airlineDataService = TestBed.get(AirlineDataService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KlmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
