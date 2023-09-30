import { Estado } from "./Estado";

export class Solicitud{
    public id:number;
    public estados:Estado[];
    public idGato:number;
    public motivo:string;

    constructor(id?: number,estados?: Estado[],idGato?: number,motivo?: string) {
        this.id = id || 0;
        this.estados = estados || [];
        this.idGato = idGato || 0;
        this.motivo = motivo || '';
    }
}