import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {parseString} from 'xml2js';

@Injectable({
  providedIn: 'root'
})

export class SoapService {

  constructor(private http:HttpClient) { }

  public obtenerProvincias():Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'text/xml',
    })
    const body=`<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
    xmlns:gen="http://www.example.com/soap/gen">
       <soapenv:Header/>
       <soapenv:Body>
          <gen:getProvinciasRequest/>
       </soapenv:Body>
    </soapenv:Envelope>`;
    return this.http.post(`/ws/`,body,{ headers, responseType: 'text' }).pipe(
      map(
        (resp:any)=>{
          const provinces: any[] = [];
          //console.log(resp);
          // const parser=new DOMParser();
          // const xml=parser.parseFromString(resp,'text/xml');
          // console.log(xml);
          parseString(resp,function(err:any,result:any){
            const json=result;
            const data=json["SOAP-ENV:Envelope"]["SOAP-ENV:Body"]["0"]["ns2:getProvinciasResponse"][0]["ns2:provincias"];
            //console.log(data);
            provinces.push(...data.map((prov: any) => ({
              id: parseInt(prov["ns2:id"][0]),
              nombre: prov["ns2:nombre"][0]
            })));
            //console.log(provinces);
          })
          return provinces;
        }
      )
    )
  }

  public obtenerLocalidades(id:number, nombre:string):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'text/xml',
    })
    const body=`<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:gen="http://www.example.com/soap/gen">
    <soapenv:Header/>
    <soapenv:Body>
       <gen:getLocalidadesRequest>
          <gen:provincia>
             <gen:id>${id}</gen:id>
             <gen:nombre>${nombre}</gen:nombre>
          </gen:provincia>
       </gen:getLocalidadesRequest>
    </soapenv:Body>
 </soapenv:Envelope>`;
 return this.http.post(`/ws/`,body,{ headers, responseType: 'text' }).pipe(
  map(
    (resp:any)=>{
      const localidades: any[] = [];
      parseString(resp,function(err:any,result:any){
        const json=result;
        const data=json["SOAP-ENV:Envelope"]["SOAP-ENV:Body"]["0"]["ns2:getLocalidadesResponse"][0]["ns2:localidades"];
        localidades.push(...data.map((loc: any) => ({
          id: parseInt(loc["ns2:id"]),
          nombre: loc["ns2:nombre"][0]
        })));
        //console.log(localidades);
      })
      return localidades;
    }
  )
)
  }

}
