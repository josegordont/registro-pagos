export class Factura {
    public idCliente?: number;
    public nombreCliente?: string;
    public nombreProyecto?: string;
    public estadoProyecto?: string;
    public idFactura: number;
    public idProyecto: number;
    public tipo: string;
    public numeroFactura: string;
    public monto: number;
    public retencion: number;
    public iva: number;
    public total: number;
    public estado: string;
    public fechaInicio: Date;
    public fechaFin: Date;
    public fechaCierre: Date;
    public numNotificaciones: number;
    public rankFechaFin: number;
    public usuarioActualizacion?: number;

    constructor() {
        this.estado = "abierto";
    }
}
