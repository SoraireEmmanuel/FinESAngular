import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from 'src/app/models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private url='https://apifines.azurewebsites.net/api/'
  constructor(private _http:HttpClient) { }


  AuthLogin(usuario:any, paswword:any){
    var login = new Login();
    login.Mail=usuario;
    login.PasswordCuenta=paswword;
    return this._http.post(`${this.url}Autenticaciones`, login)
  }
}

