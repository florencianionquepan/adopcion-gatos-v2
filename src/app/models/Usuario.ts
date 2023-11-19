import { Persona } from "./Persona";
import { Rol } from "./user";

export class Usuario{
    public id:number;
    public persona:Persona;
    public verificado:boolean;
    public bloqueado:boolean;
    public motivo:string;
    public roles:Rol[];

    constructor(id:number,persona:Persona,verificado:boolean,
        bloqueado:boolean,motivo:string,roles:Rol[]){
        this.id=id,
        this.persona=persona,
        this.verificado=verificado,
        this.bloqueado=bloqueado,
        this.motivo=motivo,
        this.roles=roles
    }
}