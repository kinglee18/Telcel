import { Component, OnInit } from '@angular/core';
import { UserRegisterComponent } from '../user-register/user-register.component';
import { UserService } from 'src/app/services/user.service';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';



@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    amaterno: new FormControl('', [Validators.required]),
    apaterno: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    enabled: new FormControl('', [Validators.required])
  });
  id: string;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
  }


  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.userService.getUser(this.id).pipe(take(1)).subscribe(
      data => {
        this.registerForm.patchValue(data);
      }
    );
  }

  onSubmit() {
    this.userService.updateUser(
      this.registerForm.getRawValue(), this.id)
      .pipe(take(1)).subscribe(data => {
        this.snackBar.open("Infomación ha sido actualizada", null, {
          duration: 2000
        });
        this.router.navigate(['/administration/users']);
      });
  }

}
