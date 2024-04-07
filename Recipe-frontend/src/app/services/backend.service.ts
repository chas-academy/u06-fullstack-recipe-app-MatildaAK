import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http:HttpClient) { }

  register(data:any){
    return this.http.post('https://u06-fullstack-recipe-app-matildaak.onrender.com/api/register', data);
  }

  login(data:any){
    return this.http.post('https://u06-fullstack-recipe-app-matildaak.onrender.com/api/login', data);
  }

}
