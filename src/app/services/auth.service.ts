import { Injectable, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService implements OnDestroy {
  private unsubscribe$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  login({ email, password }) {
    return new Observable(observer => {
      this.http
        .post(environment.api + "auth", { username: email, password })
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          data => {
            this.saveToken(data["access_token"]);
            this.savePermissions(data['permissions']);
            observer.next();
          },
          error => {
            observer.error(error);
          }
        );
    });
  }

  logout(): Observable<any> {
    return new Observable(observer => {
      localStorage.removeItem("token");
      observer.next();
      /*       this.http
              .delete(environment.api + "auth")
              .pipe(takeUntil(this.unsubscribe$))
              .subscribe(
                data => {
                  localStorage.removeItem("token");
                  observer.next();
                },
                error => {
                  observer.error(error);
                }
              ); */
    });
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token ? true : false;
  }

  getToken(): string {
    return localStorage.getItem("token");
  }

  saveToken(token: string): void {
    localStorage.setItem("token", token);
  }

  savePermissions(permissions: Array<object>) {
    localStorage.setItem('permissions',
      permissions.map(p => Object.keys(p)).toString()
    );
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getUserPermissions(): Array<string> {
    return (localStorage.getItem('permissions') || '').split(',');
  }
}
