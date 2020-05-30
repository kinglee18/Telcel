import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpdateComponent } from './user-update.component';
import { UserService } from 'src/app/services/user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CustomMaterialModule } from 'src/app/material.module';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export class UserServiceStub {
  getUser() {
    return of({});
  }
}

describe('UserUpdateComponent', () => {
  let component: UserUpdateComponent;
  let fixture: ComponentFixture<UserUpdateComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserUpdateComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        CustomMaterialModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: UserService, useValue: new UserServiceStub() }

      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
