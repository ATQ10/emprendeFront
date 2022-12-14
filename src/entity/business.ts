import { Archivo } from "./archivo";

export interface Business {
    _id: string,
    idU: string,
    nombre: string,
    descripcion: string,
    sede: string,
    inicioFecha: Date,
    creado: Date,
    url: string,
    imagen: Archivo
}