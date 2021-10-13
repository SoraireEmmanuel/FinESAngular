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

datoMateria(id:any){
  return this._http.get(`${this.url}MateriabyId/${id}`)
}
localidades(id:any){
  return this._http.get(`${this.url}MateriasCursosPorLocalidad/${id}`)
}
sedes(id:any, localidad:any){
  var body = {"Id_Materia":id,"Localidad":localidad};
  return this._http.post(`${this.url}MateriasCursosPorLocalidad`,body);
}
inscribirme(idcuros:any, idalumno:any){
  var body = {"Id_Curso":idcuros,"Id_Alumno":idalumno};
  return this._http.post(`${this.url}InscripcionMateria`,body);
}
}
