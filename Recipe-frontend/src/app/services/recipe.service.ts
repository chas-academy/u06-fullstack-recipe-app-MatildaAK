import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private baseUrl = 'https://api.edamam.com/api/recipes/v2?type=public';
  private app_key = 'a1a764474c24834cb564a2d0e5568542';
  private app_id = '1dfa4e68';

  private httpOptions = {
    headers: new HttpHeaders({
      'accept':'application/json',
      'Accept-Language':'en'
    })
  }

  constructor(private http: HttpClient) { }

  getRecipes(searchterm = "chicken", quisineType = "British", mealType = "Dinner"): Observable<any>{

    let url = this.baseUrl + "&q=" + searchterm + "&app_id=" + this.app_id + "&app_key=" + this.app_key + "&quisine_type=" + quisineType + "&meal_type=" + mealType;
    return this.http.get<any>(url, this.httpOptions);
  }

  getRecipe(id: string){

  }
}
