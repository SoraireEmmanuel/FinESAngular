import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario'

@Injectable({
  providedIn: 'root'
})
export class NuevaCuentaService {
  url = 'https://apifines.azurewebsites.net/api/'
  constructor(private _http: HttpClient) { }


  nuevaCuenta(nombre: any, apellido: any, dni: any, mail: any, password: any,
    telefono: any, rol: any) {
    var usuario = new Usuario();
    usuario.Nombre = nombre;
    usuario.Apellido = apellido;
    usuario.DNI = dni;
    usuario.Mail = mail;
    usuario.Telefono = telefono;
    usuario.Rol = rol;
    usuario.PasswordCuenta=password;
    console.log(usuario);
    return this._http.post(`${this.url}RegistroUsuarios`, usuario)
  }

}
