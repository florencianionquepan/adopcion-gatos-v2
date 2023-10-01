import { Persona } from "./Persona";

export class Notificacion{
    public id:number;
    public descripcion:string;
    public fechaCreacion:Date;
    public leida:boolean;
    public persona:Persona;

    constructor(id?: number,descripcion?:string,fechaCreacion?:Date,
        leida?:boolean,persona?:Persona){
        this.id=id||0;
        this.descripcion=descripcion||'';
        this.fechaCreacion=fechaCreacion|| new Date();
        this.leida=leida || false;
        this.persona=persona || new Persona();
    }
}