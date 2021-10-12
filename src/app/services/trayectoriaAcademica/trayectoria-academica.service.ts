import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrayectoriaAcademicaService {
  url = 'https://apifines.azurewebsites.net/api/'
  constructor(private _http: HttpClient) { }
verTrayectoriaAcademica(usuarioId?:any){
  return this._http.get(`${this.url}TrayectoriaAcademicas/${usuarioId}`)
}

verMateria(id:any){
  return this._http.get(`${this.url}CursadaById/${id}`)
}

}
