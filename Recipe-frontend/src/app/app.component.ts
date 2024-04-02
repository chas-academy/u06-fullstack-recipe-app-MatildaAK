import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BackendService } from './services/backend.service';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { LoggedInUser } from './interfaces/loggedinuser';
import { RecipeComponent } from './components/recipe/recipe.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { LoginComponent } from './components/login/login.component';
import { ModalService } from './services/modal.service';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginDetails } from './interfaces/login-details';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SearchComponent, RecipeComponent, RecipesComponent, RouterLink, RouterLinkActive, HttpClientModule, ReactiveFormsModule, AsyncPipe, LoginComponent, ProfileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'My recipe';

  ngOnInit(): void {}

  loggedIn$: Observable<LoggedInUser>;
  
  constructor(private http: HttpClient, private auth:AuthService, public modalService: ModalService) {
    this.loggedIn$ = this.auth.loggedIn$;
   }

  openModal(){
    this.modalService.openModal();
  }

  toggleDropdown(){
    let dropdown = document.querySelector('#dropdownButton #dropdown');
    dropdown?.classList.toggle("hidden");
  }

  logOut(){
    this.auth.logOut();
  }

}
