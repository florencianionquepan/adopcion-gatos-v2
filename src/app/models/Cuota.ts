import { GatoDetalle } from "./GatoDetalle";
import { Padrino } from "./Padrino";

export class Cuota{
    public id?: number;
    public fechaPago?: Date;
    public monto?:number;
    public padrino?:Padrino;
    public gato?:GatoDetalle;
  
    constructor(id?: number,fechaPago?: Date,monto?: 
        number,padrino?: Padrino,gato?:GatoDetalle) {
      this.id = id || 0;
      this.fechaPago = fechaPago || new Date();
      this.monto = monto || 0;
      this.padrino = padrino || new Padrino();
      this.gato = gato || new GatoDetalle(); 
    }
}