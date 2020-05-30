import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegisterComponent } from './user-register.component';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CustomMaterialModule } from 'src/app/material.module';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export class UserServiceStub {
  getUsersList(){
    return of([]);
  }
  getLocation(){}
  getRol() {
    return of([]);
  }
}
export class AuthServiceStub {

}
describe('UserRegisterComponent', () => {
  let component: UserRegisterComponent;
  let fixture: ComponentFixture<UserRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserRegisterComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        CustomMaterialModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: UserService, useValue: new  UserServiceStub() },
        { provide: AuthService, useValue: new  AuthServiceStub() }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
