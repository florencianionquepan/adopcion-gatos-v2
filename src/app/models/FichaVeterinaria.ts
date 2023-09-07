export class FichaVeterinaria{
    public id: number;
    public ultimaDesparatisacion: Date | null;
    public ultimaTripleFelina: Date | null;
    public ultimaAntiRabica: Date | null;
    public comentarios:string;

    constructor(
        id?: number,
        ultimaDesparatisacion?: Date,
        ultimaTripleFelina?: Date,
        ultimaAntiRabica?: Date,
        comentarios?: string
    ) {
        this.id = id || 0;
        this.ultimaDesparatisacion = ultimaDesparatisacion || null;
        this.ultimaTripleFelina = ultimaTripleFelina || null;
        this.ultimaAntiRabica = ultimaAntiRabica || null;
        this.comentarios = comentarios || '';
    }
}