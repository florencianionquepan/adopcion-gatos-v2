import { Estado } from "./Estado";
import { GatoDetalle } from "./GatoDetalle";
import { Persona } from "./Persona";

//su usa cuando se envia una solicitud de adopcion!
//para actualizar solicitud el dto usa el motivo aca!!
export class Solicitud{
    public id:number;
    public estados:Estado[];
    public gato:GatoDetalle;
    public solicitante:Persona;
    public motivo:string;

    constructor(id?: number,estados?: Estado[],gato?: GatoDetalle, solicitante?:Persona, motivo?:string) {
        this.id = id || 0;
        this.estados = estados || [];
        this.gato = gato || new GatoDetalle();
        this.solicitante = solicitante || new Persona();
        this.motivo= motivo || '';
    }
}