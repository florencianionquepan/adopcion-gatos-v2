export class Padrino{
    public id:number;
    public dni:string;
    public nombre:string;
    public apellido:string;
    public tel:string;
    public email:string;
    public fechaNac:Date;
    public dire:string;
    public localidad:string;

    constructor(id?:number,dni?:string,nombre?:string,apellido?:string,tel?:string,
        email?:string,fechaNac?:Date,dire?:string,localidad?:string){
            this.id = id || 0;
            this.dni = dni || '';
            this.nombre = nombre || '';
            this.apellido=apellido || '';
            this.tel = tel || '';
            this.email = email || '';
            this.fechaNac = fechaNac || new Date() ;
            this.dire = dire || '';
            this.localidad = localidad || '';
    }
}