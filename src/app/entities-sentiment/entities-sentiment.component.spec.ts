import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitiesSentimentComponent } from './entities-sentiment.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from '../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EntitiesSentimentComponent', () => {
  let component: EntitiesSentimentComponent;
  let fixture: ComponentFixture<EntitiesSentimentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntitiesSentimentComponent ],
      imports: [
        GoogleChartsModule.forRoot(),
        ReactiveFormsModule,
        CustomMaterialModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntitiesSentimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
