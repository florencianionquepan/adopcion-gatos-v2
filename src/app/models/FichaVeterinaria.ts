export class FichaVeterinaria{
    public id: number;
    public ultimaDesparatisacion:Date;
    public ultimaTripleFelina:Date;
    public ultimaAntiRabica:Date;
    public comentarios:string;

    constructor(
        id?: number,
        ultimaDesparatisacion?: Date,
        ultimaTripleFelina?: Date,
        ultimaAntiRabica?: Date,
        comentarios?: string
    ) {
        this.id = id || 0;
        this.ultimaDesparatisacion = ultimaDesparatisacion || new Date();
        this.ultimaTripleFelina = ultimaTripleFelina || new Date();
        this.ultimaAntiRabica = ultimaAntiRabica || new Date();
        this.comentarios = comentarios || '';
    }
}