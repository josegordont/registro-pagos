
export class Garantia {
    public idCliente?: number;
    public nombreCliente?: string;
    public nombreProyecto?: string;
    public idGarantia: number;
    public idProyecto: number;
    public fechaDevolucion: Date;
    public fechaCierre: Date;
    public estado: string;
    public total: number;
    public usuarioActualizacion?: number;
}
