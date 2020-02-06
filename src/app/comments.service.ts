import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable, of } from "rxjs";
import { timeout, delay } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class CommentsService {
  constructor(private httpClient: HttpClient) {}

  getMonthlyLanguageComments(centers, date): Observable<object> {
    return this.httpClient.get(environment.api + "comments/monthly");
  }

  getBySentiment(centers, date): Observable<object> {
    return this.httpClient.get(environment.api + "comments/sentiment");
  }

  getEntites(centers, date): Observable<any> {
    return this.httpClient.get(environment.api + "comments/entities");
  }

  getEntitiesByComments(centers, date): Observable<any> {
    return this.httpClient.get(environment.api + "comments/entities");
  }

  getEntitiesScores(centers, date, entity) {
    return this.httpClient.get(environment.api + "comments/entities/scores");
  }

  getComments(centers, date, entity): Observable<any> {
    return of([{ date: "01-01-01", id: "22", comment: "hola" }]).pipe(delay(1000));
    /*  return this.httpClient.get(environment.api + "comments/entities"); */
  }
}
