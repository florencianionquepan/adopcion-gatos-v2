import { FichaVeterinaria } from "./FichaVeterinaria";
import { Padrino } from "./Padrino";
import { Persona } from "./Persona";
import { Solicitud } from "./Solicitud";
import { Transito } from "./Transito";
import { Voluntario } from "./Voluntario";

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
    "transito":Transito | null;
    "voluntario":Voluntario |null;
    "adoptado":Date | null;
    "ficha":FichaVeterinaria | null;
    "montoMensual":number;
    "solicitudes":Solicitud[];
    "adoptante":Persona|null;

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
        transito?:Transito | null,
        voluntario?:Voluntario | null,
        ficha?: FichaVeterinaria | null,
        montoMensual?: number,
        solicitudes?: Solicitud[],
        adoptante?:Persona
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
        this.transito = transito || null;
        this.voluntario = voluntario || null;
        this.ficha = ficha || null;
        this.montoMensual = montoMensual || 0;
        this.solicitudes = solicitudes || [];
        this.adoptante=adoptante|| null;
    }
}
