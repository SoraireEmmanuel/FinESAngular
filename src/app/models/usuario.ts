export class Usuario {
    id?: number;
    Nombre: string;
    Apellido: string;
    DNI: string;
    PasswordCuenta: string;
    Direccion: string;
    Mail: string;
    Telefono: string;
    Rol: string;
  
  
    constructor() {
      this.Nombre = "",
        this.Apellido = "",
        this.DNI = "",
        this.PasswordCuenta = "",
        this.Direccion = "",
        this.Mail = "",
        this.Telefono='',
        this.Rol=''
    }
  
  }