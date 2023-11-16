import { Estado } from "./Estado";
import { Persona } from "./Persona";

export class SolicitudVoluntariado{
    public id:number;
    public aspirante:Persona;
    public voluntariado:string;
    public estados:Estado[];
    public socio:Persona;
    public motivo:string;

    constructor(
        id?: number,
        aspirante?: Persona,
        voluntariado?: string,
        estados?: Estado[],
        socio?: Persona,
        motivo?: string
    ) {
        this.id = id || 0;
        this.aspirante = aspirante || new Persona();
        this.voluntariado = voluntariado || '';
        this.estados = estados || [];
        this.socio = socio || new Persona();
        this.motivo = motivo || '';
    }
}