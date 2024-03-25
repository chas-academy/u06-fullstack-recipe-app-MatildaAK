import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private backend:BackendService, private router:Router){}
  
  public error:any= [];

  ngOnInit(): void {}

  submitLogin() {
    return this.backend.login(this.loginForm.value).subscribe(
      data=>{
        this.router.navigate(['']);
      },
      error=>{
        this.handleError(error);
      }
    );
  }
  handleError(error:any){
    this.error = error?.error?.errors || {};
  }
}
