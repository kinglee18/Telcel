import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login({ email, password }) {
    return this.http.post(environment.api, { email, password });
  }

  logout(): void {
    localStorage.removeItem("token");
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
}
