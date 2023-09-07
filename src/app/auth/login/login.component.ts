import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { LoginService } from './../services/login.service';
import Swal from 'sweetalert2';
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

  validateUser():void{
    
    if(this.loginForm.valid){
      const emailF=this.loginForm.value.email;
      const passwordF=this.loginForm.value.password;
      this.user.email=emailF;
      this.user.password=passwordF;
    }else{
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loginService.validateLoginDetails(this.user)
    .subscribe({
      next:(response:HttpResponse<any>)=>{
        if(response.headers){
          window.sessionStorage.setItem("Authorization",response.headers.get("Authorization")!);
        }
        //console.log(response);
        let body=<any> response.body;
        this.user=body.data;
        this.user.authStatus="AUTH";
        window.sessionStorage.setItem('userdetails',JSON.stringify(this.user));
        let xsrf= getCookie('XSRF-TOKEN')!;
        window.sessionStorage.setItem("XSRF-TOKEN",xsrf);
        this.router.navigate(['/']);
      },
      error:(e)=>{
        Swal.fire({'title':e});
      }
    })
  }

}
