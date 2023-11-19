import { Persona } from "./Persona";
import { Rol } from "./user";

export class Usuario{
    public id:number;
    public persona:Persona;
    public verificado:boolean;
    public habilitado:boolean;
    public motivo:string;
    public roles:Rol[];

    constructor(id?:number,persona?:Persona,verificado?:boolean,
        habilitado?:boolean,motivo?:string,roles?:Rol[]){
        this.id=id||0,
        this.persona=persona||new Persona(),
        this.verificado=verificado||true,
        this.habilitado=habilitado||true,
        this.motivo=motivo||'',
        this.roles=roles||[]
    }
}