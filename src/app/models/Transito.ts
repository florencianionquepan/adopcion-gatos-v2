import { Gato } from "./gato";

export class Transito{
    public id:number;
    public dni:string;
    public nombre:string;
    public apellido:string;
    public email:string;
    public fechaNac:Date;
    public tel:string;
    public dire:string;
    public localidad:string;
    public gatos:Gato[];

    constructor(id?:number,dni?:string,nombre?:string,apellido?:string,
        email?:string,fechaNac?:Date,
        tel?:string,dire?:string,localidad?:string, gatos?:Gato[]){
            this.id = id || 0;
            this.dni = dni || '';
            this.nombre = nombre || '';
            this.apellido = apellido || '';
            this.email = email || '';
            this.fechaNac = fechaNac || new Date() ;
            this.tel = tel || '';
            this.dire = dire || '';
            this.localidad = localidad || '';
            this.gatos = gatos || [];
    }
}