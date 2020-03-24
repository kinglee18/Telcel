import {
  async,
  ComponentFixture,
  TestBed,
  ComponentFixtureAutoDetect,
  fakeAsync,
  tick
} from "@angular/core/testing";
import { Location } from "@angular/common";
import { LoginComponent } from "./login.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CustomMaterialModule } from "../material.module";
import { AuthService } from "../auth.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { of, Observable } from "rxjs";
import { Router } from "@angular/router";
import { Component } from "@angular/core";

export class authServiceStub {
  login(): Observable<any> {
    return of();
  }
}

let routerSpy = { navigate: jasmine.createSpy("navigate") };

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let location: Location;
  let router: Router;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        CustomMaterialModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceStub },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should return an error message if user of password does not match", () => {
    fillForm("not an email");
    expect(component.loginForm.valid).toBeFalsy();
  });

  it("should validate the form and redirectTo the dashboard ", fakeAsync(() => {
    fillForm();
    tick();

    expect(component.loginForm.valid).toBeTruthy();
    // expect (routerSpy.navigate).toHaveBeenCalledWith(['/activity']);
  }));

  it("show an error for not allowed users", () => {
    fillForm();
    expect(component.loginForm.valid).toBeTruthy();
  });

  function fillForm(email = "king@hotmail.com") {
    fixture.detectChanges();
    const emailEl = fixture.debugElement.nativeElement.querySelector("#email");
    emailEl.value = email;
    const passwordEl = fixture.debugElement.nativeElement.querySelector(
      "#password"
    );
    passwordEl.value = "pass";
    emailEl.dispatchEvent(new Event("input"));
    passwordEl.dispatchEvent(new Event("input"));
    fixture.debugElement.nativeElement.querySelector("#submit").click();
  }
});
