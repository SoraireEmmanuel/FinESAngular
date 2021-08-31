import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private url='xxxx'
  constructor(private _http:HttpClient) { }


  AuthLogin(usuario:any, paswword:any){
    var usuarioData:any;
    //usuarioData = this._http.get(`${this.url}getusuario`)    
    if(usuario=='profesor'){
      paswword=1234;
      return 'profesor'
    }
    if(usuario=='alumno'){
      paswword=1234;
      return 'alumno'
    } 
    if(usuario=='coordinador'){
      paswword=1234;
      return 'coordinador'
    }        
    if(usuarioData.password == paswword){
      return usuario.rol;
    }
    else{
      return null;
    }
  return '0';
  }
}

