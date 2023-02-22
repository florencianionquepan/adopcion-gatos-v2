import { Applicant } from "./applicant";

export interface Cat{
    "id":number;
    "nombre":String,
    "srcFoto":String[],
    "edad":String,
    "sexo":String,
    "descripcion":String,
    "raza":String,
    "color":String,
    "tipoPelo":String,
    "esterilizacion":boolean,
    "desparasitacion":boolean,
    "solicitantes":Applicant[]
}


