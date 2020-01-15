import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerCareService {

  constructor() { }

  getCenters(){
    return of([{ name: "Tabasco cac", id: 2 }]);

  }
}
