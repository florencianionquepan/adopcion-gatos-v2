import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cat } from '../models/cat';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CatServiceService {
  headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
  public cats:Cat[];
  public apiGatos="http://localhost:3000/gato";
  constructor(private http:HttpClient) {
    this.cats=[];
   }

  public verGatos():Observable<Cat[]>{
    return this.http.get<any>(this.apiGatos);
  }

  public getCat(id:number): Observable<any>{
    return this.http.get<any>(`${this.apiGatos}/${id}`);
  }


}
