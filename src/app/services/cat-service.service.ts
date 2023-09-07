import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gato } from '../models/gato';
import { environment } from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CatServiceService {
  public cats:Gato[];
  public apiGatos=`${environment.url}/gatos`;
  
  constructor(private http:HttpClient) {
    this.cats=[];
   }

  public verGatos():Observable<any>{
    return this.http.get<any>(this.apiGatos);
  }

  public getGatoById(id:number): Observable<any>{
    return this.http.get<any>(`${this.apiGatos}/${id}`);
  }


}
