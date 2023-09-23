export class FichaVeterinaria{
    public id: number;
    public ultimaDesparasitacion: Date | null;
    public ultimaTripleFelina: Date | null;
    public ultimaAntirrabica: Date | null;
    public comentarios:string;
    public pdf:string;

    constructor(
        id?: number,
        ultimaDesparasitacion?: Date,
        ultimaTripleFelina?: Date,
        ultimaAntirrabica?: Date,
        comentarios?: string,
        pdf?:string
    ) {
        this.id = id || 0;
        this.ultimaDesparasitacion = ultimaDesparasitacion || null;
        this.ultimaTripleFelina = ultimaTripleFelina || null;
        this.ultimaAntirrabica = ultimaAntirrabica || null;
        this.comentarios = comentarios || '';
        this.pdf = pdf || '';
    }
}