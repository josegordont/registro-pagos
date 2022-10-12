export class Proyecto {
    public nombreCliente?: string;
    public idProyecto: number;
    public idCliente: number;
    public nombre: string;
    public descripcion: string;
    public estado: string;
    public usuarioActualizacion?: number;

    constructor() {
        this.estado = "abierto";
    }
}
