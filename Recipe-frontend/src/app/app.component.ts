import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { RecipeAboutComponent } from './components/recipe-about/recipe-about.component';
import { RecipeAllComponent } from './components/recipe-all/recipe-all.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { BackendService } from './services/backend.service';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { LoggedInUser } from './interfaces/loggedinuser';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SearchComponent, RecipeAboutComponent, RecipeAllComponent, RouterLink, RouterLinkActive, HttpClientModule, ReactiveFormsModule, LoginStatusComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'My recipe';

  isAuthenticated: boolean = false;
  userName: string = '';

  storage: Storage = localStorage;

  ngOnInit(): void {
    // Check authentication state on component initialization
    this.checkAuthentication();
  }

  loggedIn$: Observable<LoggedInUser>;
  
  constructor(private http: HttpClient, private auth:AuthService) {
    this.loggedIn$ = this.auth.loggedIn$;
   }

  checkAuthentication() {
    // Example: Check if user is logged in based on a token in storage
    const token = this.storage.getItem('token');
    if (token) {

      this.http.get<any>('api/getuser', { headers: { 'Authorization': `Bearer ${token}` }})
        .subscribe(
          (response) => {
            this.isAuthenticated = true;
            this.userName = response.name;
            this.storage.setItem('userEmail', response.email);
          },
          (error) => {
            console.error('Error fetching user details:', error);
            // Handle error or fallback to default values
            this.isAuthenticated = true; // Assuming user is authenticated, but details could not be fetched
            this.userName = 'John Doe';
            this.storage.setItem('userEmail', 'john.doe@example.com');
          }
        );
    }
  }

  logout() {
    // Example: Clear authentication token from storage or perform logout action
    this.storage.removeItem('token');
    // Clear user details
    this.isAuthenticated = false;
    this.userName = '';
  }
}
