import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, forkJoin, map } from 'rxjs';
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
          //console.log(provincias);
          return provincias;
        }
      )
    )
  }

  public obtenerLocalidadesByProvinciaId(id: number): Observable<any> {
    return this.obtenerTodasLasLocalidades(id, 5);
  }
  
  private obtenerTodasLasLocalidades(id: number, maxPages: number): Observable<any[]> {
    const pageSize = 10; // Cantidad de localidades por página
  
    const observables = [];
    for (let page = 0; page < maxPages; page++) {
      const params = new HttpParams()
        .set('provincia', id.toString())
        .set('inicio', (page * pageSize).toString());
  
      const observable = this.http.get(`${this.apiGeoRef}/localidades`, { params }).pipe(
        map((response: any) => {
          const localidadesUnicas: { id: number, nombre: string }[] = [];
          const localidadesSet = new Set();
  
          response.localidades.forEach((localidad: any) => {
            const nombreLocalidad = localidad.localidad_censal.nombre;
            if (!localidadesSet.has(nombreLocalidad)) {
              localidadesSet.add(nombreLocalidad);
              localidadesUnicas.push({ id: localidad.id, nombre: nombreLocalidad });
            }
          });
  
          return localidadesUnicas;
        }),
        catchError(error => {
          console.error(error);
          return [];
        })
      );
  
      observables.push(observable);
    }
  
    return forkJoin(observables).pipe(
      map(responses => {
        // Combinar y aplanar las respuestas en un solo array
        return responses.reduce((acc, localidades) => acc.concat(localidades), []);
      })
    );
  }
}
