import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  validateLoginDetails(user:User){
    window.sessionStorage.setItem("userDetails",JSON.stringify(user));
    return this.http.get(`${environment.url}/user`,{observe:'response',withCredentials:true})
  }
}
