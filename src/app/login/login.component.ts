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
export class LoginComponent implements OnInit, OnDestroy {
  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required])
  });
  loginError = false;
  loginRequest: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    console.log(this.loginForm.get("email").hasError("email"));
  }

  onSubmit() {
    this.loginRequest = this.authService
      .login(this.loginForm.getRawValue())
      .subscribe(
        data => {
          this.loginError = false;
          this.authService.saveToken(data["token"]);
          this.router.navigate(["/activity"]);
        },
        error => {
          if(error.status === 401) {
            this.loginError = true;
          }
          alert("Intente mas tarde")
        }
      );
  }

  ngOnDestroy() {
    this.loginRequest.unsubscribe();
  }
}
