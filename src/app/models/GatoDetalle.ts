import { FichaVeterinaria } from "./FichaVeterinaria";
import { Padrino } from "./Padrino";

export class GatoDetalle{
    "id":number;
    "nombre":string;
    "fotos":string[];
    "edad":string;
    "sexo":string;
    "descripcion":string;
    "color":string;
    "tipoPelo":string;
    "padrino":Padrino | null;
    "adoptado":Date | null;
    "fichaVeterinaria":FichaVeterinaria | null;
    "montoMensual":number;
    "solicitudes":string[];

    constructor(
        id?: number,
        nombre?: string,
        fotos?: string[],
        edad?: string,
        sexo?: string,
        descripcion?: string,
        color?: string,
        tipoPelo?: string,
        padrino?: Padrino | null,
        adoptado?: Date | null,
        fichaVeterinaria?: FichaVeterinaria | null,
        montoMensual?: number,
        solicitudes?: string[]
    ) {
        this.id = id || 0;
        this.nombre = nombre || '';
        this.fotos = fotos || [];
        this.edad = edad || '';
        this.sexo = sexo || '';
        this.descripcion = descripcion || '';
        this.color = color || '';
        this.tipoPelo = tipoPelo || '';
        this.padrino = padrino || null;
        this.adoptado = adoptado || null;
        this.fichaVeterinaria = fichaVeterinaria || null;
        this.montoMensual = montoMensual || 0;
        this.solicitudes = solicitudes || [];
    }
}
