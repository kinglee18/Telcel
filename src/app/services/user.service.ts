import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  createUser(user: any): Observable<any> {
    return this.http.post(environment.api + 'register', user);
  }

  deleteUser(user: any): Observable<any> {
    return this.http.delete(environment.api + 'users', user);
  }

  updateUser(user: any, id: string): Observable<any> {
    return this.http.put(environment.api + 'userUpdate',
      Object.assign({ 'id_user': id }, user)
    );
  }

  getUsersList(id: string): Observable<any> {
    return this.http.get(environment.api + 'getUsers', {
      params: {
        'idLocation': id
      }
    });
  }

  getUser(user): Observable<object> {
    return this.http.get(environment.api + "userInfo", {
      params: { 'id_user': user }
    });
  }

  getRol(): Observable<Array<object>> {
    return this.http.get(environment.api + "roles")
      .pipe(map((val: Array<any>) => val.map((item: Array<any>) =>
        new Object({ id: item[0], value: item[1] }))));
  }

  getLocation(): Observable<Array<object>> {
    return this.http.get(environment.api + "locations")
      .pipe(map((val: Array<any>) => val.map((item: Array<any>) =>
        new Object({ id: item[0], value: item[1] }))));
  }
}
