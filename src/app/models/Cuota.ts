import { GatoDetalle } from "./GatoDetalle";
import { Padrino } from "./Padrino";

export class Cuota{
    public id: number;
    public fechaCreacion: Date;
    public fechaPago?: Date;
    public montoMensual:number;
    public preferencia_id:string;
    public estadoPago?:EstadoPago;
    public padrino?:Padrino;
    public gato!:GatoDetalle;
  
    constructor(id?: number,fechaCreacion?: Date,fechaPago?: Date,
      monto?:number,preferencia_id?:string,estadoPago?:EstadoPago,
      padrino?: Padrino,gato?:GatoDetalle) {
      this.id = id || 0;
      this.fechaCreacion= fechaCreacion || new Date();
      this.fechaPago = fechaPago || new Date();
      this.montoMensual = monto || 0;
      this.preferencia_id= preferencia_id || '';
      this.estadoPago = estadoPago || EstadoPago.DESCONOCIDO;
      this.padrino = padrino || new Padrino();
      this.gato = gato || new GatoDetalle(); 
    }
}

export enum EstadoPago{
  PENDIENTE='PENDIENTE',
  APROBADO='APROBADO',
  RECHAZADO='RECHAZADO',
  DESCONOCIDO='DESCONOCIDO',
  CANCELADO='CANCELADO'
}