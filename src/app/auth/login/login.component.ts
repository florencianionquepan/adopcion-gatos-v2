import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { getCookie } from 'typescript-cookie';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  authStatus:string='';
  user=new User();
  public loginForm:FormGroup=this.fb.group({
    email:['',[Validators.email,Validators.required]],
    password:['',[Validators.required,Validators.minLength(8)]]
  });

  constructor(private router:Router, 
    private loginService:LoginService,
    private fb:FormBuilder) {}

  isValidField(field:string):boolean | null{
    return this.loginForm.controls[field].errors &&
      this.loginForm.controls[field].touched;
  }

  getFieldError(field:string):string | null{
    if(!this.loginForm.controls[field]) return null;
    const errors=this.loginForm.controls[field].errors || {};
    //console.log(errors);
    for (const key in errors) {
      switch(key){
        case 'required': return `El campo ${field} es requerido`;
        case 'minlength': return `Minimo ${errors['minlength']['requiredLength']} caracteres`
      }
    }
    return null;
  }

  validateUser(){
    if(this.loginForm.valid){
      const emailF=this.loginForm.value.email;
      const passwordF=this.loginForm.value.password;
      this.user.email=emailF;
      this.user.password=passwordF;
    }

    this.loginService.validateLoginDetails(this.user)
    .subscribe(
      responseData=>{
        if(responseData.headers){
          window.sessionStorage.setItem("Authorization",responseData.headers.get("Authorization")!);
        }
        console.log(responseData);
        let body=<any> responseData.body;
        this.user=body.data;
        this.user.authStatus="AUTH";
        window.sessionStorage.setItem('userdetails',JSON.stringify(this.user));
        let xsrf= getCookie('XSRF-TOKEN')!;
        window.sessionStorage.setItem("XSRF-TOKEN",xsrf);
        this.router.navigate(['/']);
      },
      (error:HttpErrorResponse)=>{
        if(error.status==401){
          console.log("credenciales incorrectas");
        }
      }
    )
  }

}
