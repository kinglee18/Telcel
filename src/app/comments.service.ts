import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CommentsService {
  constructor(private httpClient: HttpClient) {}

  getMonthlyLanguageComments(centers, date): Observable<object> {
    return this.httpClient.get(environment.api + "comments/monthly", {
      params: { centers, date_init: date.begin, date_end: date.end }
    });
  }

  getBySentiment(centers, date): Observable<object> {
    return this.httpClient.get(environment.api + "comments/sentiment", {
      params: { centers, date_init: date.begin, date_end: date.end }
    });
  }

  getEntites(centers, date): Observable<any> {
    return this.httpClient.get(environment.api + "comments/entities", {
      params: { centers, date_init: date.begin, date_end: date.end }
    });
  }

  getEntitiesByComments(centers, date): Observable<any> {
    return this.httpClient.get(environment.api + "comments/entities", {
      params: { centers, date_init: date.begin, date_end: date.end }
    });
  }

  getEntitiesScores(centers, date, entity?) {
    let params: any = { centers, date_init: date.begin, date_end: date.end };
    if (entity) {
      params.entity = entity.id;
    }

    return this.httpClient.get(environment.api + "comments/entities/scores", {
      params
    });
  }

  getComments(centers, date, entity?): Observable<any> {
    let params: any = { centers, date_init: date.begin, date_end: date.end };
    if (entity) {
      params.entity = entity.id;
    }
    return this.httpClient.get(environment.api + "comments/list", {
      params
    });
  }

  replyReview(reviewId, comment): Observable<any> {
    return this.httpClient.put(environment.api + "answer", {
      reviewId,
      comment
    });
  }
}
