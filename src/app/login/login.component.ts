import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements  OnDestroy {
  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required])
  });
  loginError = false;
  loginRequest: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.loginRequest = this.authService
      .login(this.loginForm.getRawValue())
      .subscribe(
        data => {
          this.loginError = false;
          this.router.navigate(["/activity"]);
        },
        error => {
          if (error.status === 401) {
            this.loginError = true;
          } else {
            alert("Intente mas tarde");
          }
        }
      );
  }

  clearErrorMessage() {
    this.loginError = false;
  }

  ngOnDestroy() {
    this.loginRequest.unsubscribe();
  }
}
