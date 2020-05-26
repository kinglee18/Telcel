import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { take } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(40)]),
    lastNameM: new FormControl('', [Validators.required, Validators.maxLength(40)]),
    lastNameF: new FormControl('', [Validators.required, Validators.maxLength(40)]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    idRol: new FormControl('', [Validators.required]),
    enabled: new FormControl(true, [])
  });
  constructor(
    protected userService: UserService,
    private authService: AuthService,
    private route: Router,
    private snackBar: MatSnackBar
  ) { }

  rolList = []; branchList = [];
  ngOnInit(): void {

    forkJoin(
      {
        rolList: this.userService.getRol(),
        branches: this.userService.getLocation()
      }
    ).pipe(take(1))
      .subscribe(
        data => {
          console.log(data);
          this.rolList = data.rolList;
          this.branchList = data.branches;
        }
      );
  }

  onSubmit() {
    this.userService.createUser(Object.assign(
      { 'idLocation': this.authService.getUserId() }, this.registerForm.getRawValue()
    ))
      .pipe(take(1)).subscribe(data => {
        this.snackBar.open("El usuario ha sido creado", null, {
          duration: 2000
        });
        this.route.navigate(['/administration/users']);
      }, (err: HttpErrorResponse) => {
        if (err.status === 400) {
          alert(Object.values(err.error).toString());
        }
      });
  }
}
