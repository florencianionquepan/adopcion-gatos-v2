import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { apiGeoRef } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeorefService {
  public apiGeoRef=apiGeoRef.url;
  constructor(private http: HttpClient) { }

  public obtenerProvincias():Observable<any>{
    return this.http.get(`${this.apiGeoRef}/provincias`).pipe(
      map(
        (resp:any)=>{
          const provincias = resp.provincias.map((provincia: any) => {
            return {
              id: provincia.id,
              nombre: provincia.nombre
            };
          });
          return provincias;
        }
      )
    )
  }

  public obtenerLocalidadesByProvinciaId(id:number):Observable<any>{
    return 	this.http.get(`${this.apiGeoRef}/localidades?provincia=${id}`).pipe(
      map((response: any) => {
        const localidades = response.localidades.map((localidad: any) => {
          return localidad.localidad_censal.nombre;
        });
        return localidades;
      })
    )
  }
}
