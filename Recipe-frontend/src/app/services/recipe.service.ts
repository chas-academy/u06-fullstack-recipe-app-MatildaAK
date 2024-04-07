import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filter } from '../interfaces/filter';

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


  getRecipes(filter: Filter): Observable<any> {
    let url = `${this.baseUrl}&app_id=${this.app_id}&app_key=${this.app_key}`
    if(filter.query){
      url += `&q=${filter.query}`
    }
    if(filter.health){
      url += `&health=${filter.health}`
    }
    if(filter.cuisineTypes){
      url += `&quisine_type=${filter.cuisineTypes}`
    }
    if(filter.mealTypes){
      url += `&meal_type=${filter.mealTypes}`
    }
    if(filter.dishType){
      url += `&dishType=${filter.dishType}`
    }
    if(filter.diet){
      url += `&diet=${filter.diet}`
    }
    url = encodeURI(url);
    return this.http.get(url, this.httpOptions);
    
  }

  getRecipe(id: string): Observable<any>{
    let recipeUrl = `https://api.edamam.com/api/recipes/v2/`;
    let url = `${recipeUrl}${id}?type=public&app_id=${this.app_id}&app_key=${this.app_key}`;
    return this.http.get<any>(url, this.httpOptions);
  }

}
