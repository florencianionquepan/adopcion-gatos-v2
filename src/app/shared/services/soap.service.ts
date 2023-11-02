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
          console.log(resp);
          // const parser=new DOMParser();
          // const xml=parser.parseFromString(resp,'text/xml');
          // console.log(xml);
          parseString(resp,function(err:any,result:any){
            let data=JSON.stringify(result);
            console.log(result);
          })
          /* const provincias = resp.provincias.map((provincia: any) => {
            return {
              id: provincia.id,
              nombre: provincia.nombre
            }; 
            });*/
          //console.log(provincias);
        }
      )
    )
  }

}
