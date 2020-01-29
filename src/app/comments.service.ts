import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

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

  getEntites(centers, date) {
    return this.httpClient.get(environment.api + "comments/entities");
  }

  getEntitiesScores(centers, date, entity) {
    return this.httpClient.get(environment.api + "comments/entities/scores");
  }
}
