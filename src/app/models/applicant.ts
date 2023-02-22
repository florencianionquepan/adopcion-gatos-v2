import { Cat } from "./cat";

export interface Applicant{
    "dni":String,
    "nombre":String,
    "apellido":String,
    "fechaNac":Date,
    "telefono":String,
    "email":String,
    "domicilio":String,
    "localidad":String,
    "gato":Cat
}

