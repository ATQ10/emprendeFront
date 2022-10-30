import { Archivo } from "./archivo"

export interface Product{
    _id: string,
    idN: string,
    nombre: string,
    descripcion: string,
    precioCompra: number,
    precioVenta: number,
    stock: number,
    minStock: number,
    detalles: string,
    creado: Date,
    url: string,
    imagen: Archivo
    activo: boolean
}
