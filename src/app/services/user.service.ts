import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  createUser(user: any): Observable<any> {
    return this.http.post(environment.api + 'register', user);
  }

  deleteUser(user: any): Observable<any> {
    return this.http.delete(environment.api + 'register', user);
  }

  updateUser(user: any): Observable<any> {
    return this.http.put(environment.api + 'register', user);
  }

  getUsersList(): Observable<any> {
    return this.http.get(environment.api + 'register');
  }

  getUser(user): Observable<object> {
    return this.http.get(environment.api + "register", {
      params: { user }
    });
  }

}
