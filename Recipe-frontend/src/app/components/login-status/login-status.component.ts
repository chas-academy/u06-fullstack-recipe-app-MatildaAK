import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-login-status',
  standalone: true,
  imports: [],
  templateUrl: './login-status.component.html',
  styleUrl: './login-status.component.css'
})

export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  userName: string = '';

  storage: Storage = localStorage; // You can choose sessionStorage or localStorage based on your needs

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Check authentication state on component initialization
    this.checkAuthentication();
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
