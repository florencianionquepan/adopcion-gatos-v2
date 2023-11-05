import { GatoDetalle } from "./GatoDetalle";

export class AsignGato{
    public id:number;
    public fechaAsignacion:Date;
    public fechaFin:Date;
    public gato:GatoDetalle;

    constructor(id:number, fechaAsign:Date, fechaFin?:Date, gato?:GatoDetalle){
        this.id=id;
        this.fechaAsignacion=fechaAsign;
        this.fechaFin=fechaFin|| new Date(),
        this.gato=gato || new GatoDetalle();
    }
}