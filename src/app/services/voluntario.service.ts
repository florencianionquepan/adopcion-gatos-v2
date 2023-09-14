import { Injectable } from '@angular/core';
import { GatoDetalle } from '../models/GatoDetalle';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoluntarioService {
  public gatos:GatoDetalle[]=[];
  public apiVoluntarios=`${environment.url}/voluntarios`;

  constructor(private http:HttpClient) { }
  
}
