import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Asistencia } from '../models/asistencia';
import { Clases } from '../models/clases';
import { Curso } from '../models/curso';
import { Materia } from '../models/materia';
import { Nota } from '../models/nota';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class CursoContenidoService {
  myAppUrl = 'https://fines-back.herokuapp.com/';
  newAPI = 'https://apifines.azurewebsites.net/api/';
  listCursos: any[];
  listMaterias: any[];
  listClases: any;
  curso: any;
  mat: Materia;
  da: object;
  vista: boolean;
  clase: Clases;
  asist: any;
  notas: any;
  idDocente: any;
  private actualizarFormulario = new BehaviorSubject<any>({} as any);
  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.vista = false;
    this.idDocente = localStorage.getItem('idUsuario');
  }
  obtenerCursos1() {
    this.idDocente = localStorage.getItem('idUsuario');
    return this.http.get(`${this.newAPI}CursosByIdDocente/${this.idDocente}`)
  }
  obtenerClases(idCurso: any) {
    this.http.get(`${this.newAPI}TodasLasClasesPorCurso/${idCurso}`).toPromise()
      .then(data => {
        this.listClases = data as Clases

      })
    return this.listClases
  }
  obtenerClase(idclase: any, ige: any) {
    return this.http.get(`${this.newAPI}VerInfoClaseByClaseID/${idclase}`)
  }
  obtenerCurso1(id: any) {
    return this.http.get(`${this.newAPI}CursosByIdCurso/${id}`)
  }
  actualizar(id: any) {
    this.actualizarFormulario.next(id);
  }
  obtenerDato$(): Observable<any> {
    return this.actualizarFormulario.asObservable();
  }
  obtenerMateria1(idCurso: any) {
    return this.http.get(`${this.newAPI}MateriaPorIge/${idCurso}`)
  }
  obtenerAsistencia1(idClase: number) {
    this.http.get(`${this.newAPI}TodasLasAsistenciasDeUnaClase/${idClase}`).toPromise()
      .then(
        (dat: any) => {
          this.asist = dat as Asistencia;
           //console.log("obtener asis service", this.asist)
            ;
        });
    return this.asist;
  }
  obtenerNotas(idCurso: any) {
    this.http.get(`${this.newAPI}NotasByCursoId/${idCurso}`).toPromise()
      .then((dat: any) => {
        this.notas = dat as Nota;

          ;
      })
    return this.notas;
  }
  editarClase(clase: Clases) {
    this.http.put(`${this.myAppUrl}clases/${clase.Id_Clase}`, clase).subscribe(
      data => {

        this.toastr.success('La clase fue editada exitosamente', 'EDICIÓN EXITOSA');
      },
      error => {

      }
    );
  }
  editarNota(id: string, idCurso: any, nota: Nota) {
    this.http.post(`${this.newAPI}ActualizarNota1/${id}`, nota).toPromise()
      .then(
        data => {

          this.toastr.success('La nota fue editada exitosamente', 'EDICIÓN EXITOSA');
          this.obtenerNotas(idCurso);

        },
        error => {

        }
      ).then((d: any) => {
        this.obtenerNotas(idCurso);

      }
      );
  }
  actualizarCursoEstado(curso: any, estado: string) {

    var body = { "id_Curso": curso }
    this.http.post(`${this.newAPI}ActualizarEstadoCurso/`, body).toPromise()
      .then(
        data => {

          this.obtenerCursos1();

        },
        error => {

        })
  }
  actualizarClase(clase: any) {


    var body = {
      "Id_Clase": clase.Id_Clase,
      "Contenido": clase.Contenido,
      "Titulo": clase.Titulo,
      "Fecha": clase.Fecha
    }
    this.http.post(`${this.newAPI}ActualizarClase`, body).toPromise()
      .then(
        data => {

          this.toastr.success('La clase fue editada exitosamente', 'EDICIÓN EXITOSA');

          this.obtenerCursos1();

        },
        error => {

        })
  }
  actualizarAsistencia(idAsistencia: any) {
    var body1 = { "Id_Asistencia": idAsistencia }
    this.http.post(`${this.newAPI}ActualizarAsistencia`, body1).toPromise()
      .then(
        data => {


        },
        error => {

        })
  }
}
