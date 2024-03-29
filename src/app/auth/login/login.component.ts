import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { LoginService } from './../services/login.service';
import { getCookie } from 'typescript-cookie';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';


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
    private fb:FormBuilder,
    private authSvc:AuthService) {}

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

    this.loginService.validateLoginDetails(this.user).subscribe(
      (user)=>{
        this.loginSuccess(user);
      }
    )
  }

  loginSuccess(user:User):void{
    const urlPrevia=this.authSvc.getUrlPrevia();
    Swal.fire({
      title:`Bienvenido ${user.nombre}!`,
      timer:1200,
    })
    this.router.navigate([urlPrevia]);
    this.authSvc.eliminarUrlPrevia();
  }

}
