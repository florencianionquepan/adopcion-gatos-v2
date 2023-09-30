export class Persona{
    public id:number;
    public dni:string;
    public nombre:string;
    public apellido:string;
    public email:string;
    public fechaNacimiento:Date;
    public telefono:string;
    public direccion:string;
    public localidad:string;

    constructor(id?:number,dni?:string,nombre?:string,apellido?:string,email?:string,fechaNacimiento?:Date,
        telefono?:string,direccion?:string,localidad?:string){
            this.id = id || 0;
            this.dni = dni || '';
            this.nombre = nombre || '';
            this.apellido=apellido || '';
            this.email = email || '';
            this.fechaNacimiento = fechaNacimiento || new Date() ;
            this.telefono = telefono || '';
            this.direccion = direccion || '';
            this.localidad = localidad || '';
    }
}