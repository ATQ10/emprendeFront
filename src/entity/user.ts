export interface User {
    _id: string;
    email: string,
    password: string,
    nombre: string,
    apellido: string,
    telefono: string | null,
    creado: Date
}
