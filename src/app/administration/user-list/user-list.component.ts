import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Subscriber } from 'rxjs';
import { take } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  dataSource = new MatTableDataSource();
  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userService.getUsersList(this.authService.getUserId()).pipe(take(1))
      .subscribe(data => {
        console.log(data);

        this.dataSource = new MatTableDataSource(data);

      });
  }

}
