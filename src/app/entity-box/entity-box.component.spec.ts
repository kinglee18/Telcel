import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityBoxComponent } from './entity-box.component';
import { CustomMaterialModule } from '../material.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LoadingStubDirective, commentsServiceStub } from '../activity/activity.component.spec';
import { CommentsService } from '../comments.service';
import { CustomerCareService } from '../customer-care.service';
import { CustomerCareServiceStub } from '../app.component.spec';

describe('EntityBoxComponent', () => {
  let component: EntityBoxComponent;
  let fixture: ComponentFixture<EntityBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ EntityBoxComponent, LoadingStubDirective ],
      imports: [CustomMaterialModule],
      providers: [
        {
          provide: CommentsService,
          useValue: new commentsServiceStub()
        },
        {
          provide: CustomerCareService,
          useValue: new CustomerCareServiceStub()
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
 