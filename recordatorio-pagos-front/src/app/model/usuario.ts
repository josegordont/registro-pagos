export class Usuario {
    public idUsuario: number;
    public correo: string;
    public contrasena: string;
    public nombres: string;
    public apellidos: string;
    public rol: string;
    public cambiarContrasena: boolean;
    public usuarioActualizacion?: number;
}