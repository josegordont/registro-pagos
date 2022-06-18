export class Factura {
    public nombreCliente?: string;
    public nombreProyecto?: string;
    public idFactura: number;
    public idProyecto: number;
    public tipo: string;
    public numeroFactura: string;
    public monto: number;
    public estado: string;
    public fechaPago: Date;
    public numNotificaciones: number;

    constructor() {
        this.estado = "abierto";
    }
}
