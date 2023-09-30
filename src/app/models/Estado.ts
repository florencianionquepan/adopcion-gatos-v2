export class Estado{
    public id?: number;
    public fecha?: Date;
    public estado?: EstadoNombre;
    public motivo?: string;
  
    constructor(id?: number,fecha?: Date,estado?: EstadoNombre,motivo?: string) {
      this.id = id || 0;
      this.fecha = fecha || new Date();
      this.estado = estado || undefined;
      this.motivo = motivo || '';
    }
}

export enum EstadoNombre {
    PENDIENTE,
    APROBADA,
    RECHAZADA,
    CERRADA,
}