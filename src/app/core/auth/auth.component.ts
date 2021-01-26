import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authForm: FormGroup;

  authFormError: string = '';

  visiblePage = "signin";

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.authForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(6), Validators.required]],
      confirmPassword: ['', [Validators.minLength(6)]] 
    })
  }

  ngOnInit() {
  }


  signUp(){
    const email= this.authForm.value.email;
    const password = this.authForm.value.password;
    this.authService.signUp(email, password).subscribe(response =>{
      console.log(response);
      this.authFormError = '';
    }, error => {
      console.log(error);
      this.authFormError = error.error.error.message;
    })
    this.authForm.reset();
  }

  signIn(){
    const email= this.authForm.value.email;
    const password = this.authForm.value.password;
    this.authService.signIn(email, password).subscribe(response =>{
      console.log(response)
      this.authFormError = '';
    }, error => {
      console.log(error);
      this.authFormError = error.error.error.message;
    })
    this.authForm.reset();
  }

  reset(){
    
  }


  visiblePageChange(value){
    this.authForm.reset();
    this.visiblePage = value;
    this.authFormError = '';
  }

}
