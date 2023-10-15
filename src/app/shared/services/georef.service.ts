import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, expand, map, of, reduce, take, throwError } from 'rxjs';
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
    return this.obtenerTodasLasLocalidades(id,3);
  }

  private obtenerTodasLasLocalidades(id: number, maxPages:number, page = 0): Observable<any> {
    const pageSize = 10; // Cantidad de localidades por página
    return this.obtenerLocalidadesPorPagina(id, page, pageSize).pipe(
      expand((localidadesEnPagina) => {
        if (localidadesEnPagina.length < pageSize) {
          return EMPTY; // Detiene la expansión si no hay más páginas
        }
        return this.obtenerLocalidadesPorPagina(id, page + 1, pageSize);
      }),
      take(maxPages),
      reduce((allLocalidades: string[], localidadesEnPagina: string[]) => allLocalidades.concat(localidadesEnPagina), [])
    );
  }

  private obtenerLocalidadesPorPagina(id: number, page: number, pageSize: number): Observable<string[]> {
    const params = new HttpParams()
      .set('provincia', id.toString())
      .set('inicio', (page * pageSize).toString());
  
    return this.http.get(`${this.apiGeoRef}/localidades`, { params }).pipe(
      map((response: any) => {
        //console.log(response);
        return response.localidades.map((localidad: any) => localidad.localidad_censal.nombre);
      }),
      catchError(error => {
        console.error(error);
        return throwError(()=>error)
      })
    );
  }
  
}
