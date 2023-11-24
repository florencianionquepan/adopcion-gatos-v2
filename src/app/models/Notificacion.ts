import { Persona } from "./Persona";

export class Notificacion{
    public id:number;
    public descripcion:string;
    public fechaCreacion:Date;
    public leida:boolean;
    public persona:Persona;
    public path:string;

    constructor(id?: number,descripcion?:string,fechaCreacion?:Date,
        leida?:boolean,persona?:Persona, path?:string){
        this.id=id||0;
        this.descripcion=descripcion||'';
        this.fechaCreacion=fechaCreacion|| new Date();
        this.leida=leida || false;
        this.persona=persona || new Persona();
        this.path= path || '';
    }
}