import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  registrationsForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    password_confirmation: new FormControl('')
  });

  constructor(private backend:BackendService, private router:Router){}

  public error:any= [];

  ngOnInit(): void {}

  submitRegistration() {
    return this.backend.register(this.registrationsForm.value).subscribe(
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
