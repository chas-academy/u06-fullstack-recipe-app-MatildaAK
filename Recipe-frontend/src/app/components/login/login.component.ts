import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';
import { ModalService } from '../../services/modal.service';
import { AuthService } from '../../services/auth.service';
import { LoginDetails } from '../../interfaces/login-details';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginDetails: LoginDetails;

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private backend:BackendService, private router:Router, private modalService: ModalService, private auth: AuthService){
    this.loginDetails = {
      email: 'seb@seb.seb',
      password: 'sebsebseb',
    };
  }
  
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
  login(){
    this.auth.loginUser(this.loginDetails);
  }

  logout(){
    this.auth.logOut();
  }
  
  handleError(error:any){
    this.error = error?.error?.errors || {};
  }

  closeModal() {
   this.modalService.closeModal();
  }
}
