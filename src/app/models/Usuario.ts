import { Persona } from "./Persona";
import { Rol } from "./user";

export class Usuario{
    public persona:Persona;
    public verificado:boolean;
    public bloqueado:boolean;
    public roles:Rol[];

    constructor(persona:Persona,verificado:boolean,bloqueado:boolean,roles:Rol[]){
        this.persona=persona,
        this.verificado=verificado,
        this.bloqueado=bloqueado,
        this.roles=roles
    }
}