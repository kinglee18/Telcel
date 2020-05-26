import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
declare var KTLayout: any;

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * @description - close user current session in applpication
   */
  closeSession() {
    this.authService.logout().subscribe(
      data => {
        this.router.navigate(["/login"]);
      }
    );
  }

  /**
   * @description - triggers jquery onDocumentReady function to enable dom effects
   */
  ngAfterViewInit() {
    setTimeout(() => {
      KTLayout.init();
    }, 300);
  }
}
