import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { LoggedInUser } from './interfaces/loggedinuser';
import { RecipeComponent } from './components/recipe/recipe.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RecipeComponent, RecipesComponent, RouterLink, RouterLinkActive, HttpClientModule, ReactiveFormsModule, AsyncPipe, LoginComponent, ProfileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'My recipe';

  ngOnInit(): void {
    document.addEventListener("click", (event) => {
      const menuDropdown = document.getElementById("menuDropdown");
      if (!menuDropdown?.contains(event.target as Node)) {
        this.closeMenu();
      }
    });
    document.addEventListener("click", (event) => {
      const toggleDropdown = document.getElementById("dropdownButton");
      if (!toggleDropdown?.contains(event.target as Node)) {
        this.closeToggleDropdown();
      }
    });

  }

  loggedIn$: Observable<LoggedInUser>;
  
  constructor(private http: HttpClient, private auth:AuthService) {
    this.loggedIn$ = this.auth.loggedIn$;
   }


  // dropdown for profile, logout
  toggleDropdown(){
    let dropdown = document.querySelector('#dropdownButton #dropdown');
    dropdown?.classList.toggle("hidden");
  }
  // closing the dropdown menu when  you click outside it 
  closeToggleDropdown(){
    let dropdown = document.querySelector('#dropdownButton #dropdown');
    dropdown?.classList.add("hidden");
  }

  logOut(){
    this.auth.logOut();
  }

  // dropdown for home page, seach recipes
  menu(){
    let menu = document.querySelector('#menuDropdown #menu');
    menu?.classList.toggle("hidden");
  }
   // closing the dropdown menu when  you click outside it 
  closeMenu() {
    let menu = document.querySelector('#menuDropdown #menu');
    menu?.classList.add("hidden");
  }

}
