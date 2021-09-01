import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Clases } from '../models/clases';
import { Curso } from '../models/curso';
import { Materia } from '../models/materia';

@Injectable({
  providedIn: 'root'
})
export class CursoContenidoService {
 // myAppUrl = 'http://localhost:3000/';
  myAppUrl = 'https://fines-back.herokuapp.com/';
  listCursos: any[];
  listMaterias: any[];
  listClases: any[];
  curso: any;
  mat: Materia;
  da: object;
  vista:string;
  clase: Clases;


  private actualizarFormulario = new BehaviorSubject<any>({} as any);


  constructor(private http: HttpClient) {
    this.vista="inactivo";
  }

  obtenerCursos() {
    this.http.get(this.myAppUrl + 'cursos').toPromise()
      .then(data => {
        this.listCursos = data as any;
        //console.log(this.listCursos)

      });

  }
  obtenerCursos1() {
    return this.http.get(this.myAppUrl + 'cursos')
  }

  obtenerClases(ige: any) {
    return this.http.get(`${this.myAppUrl}clases?igeCurso=${ige}`)
  }
  obtenerClase(idclase: any, ige:any) {
    return this.http.get(`${this.myAppUrl}clases?id=${idclase}&igeCurso=${ige}`)
  }
  // obtenerCurso(id: number){
  //    this.http.get(`${this.myAppUrl}cursos/${id}`).toPromise()
  //    .then(data => {
  //     this.curso = data as any;
  //     //console.log(this.listCursos)

  //   });
  // }
  obtenerCurso1(id: number) {
    return this.http.get(`${this.myAppUrl}cursos/${id}`)
    //   .then(data => {
    //    this.curso = data as any;
    //    //console.log(this.listCursos)

    //  });
  }
  actualizar(id: any) {
    this.actualizarFormulario.next(id);
  }
  obtenerDato$(): Observable<any> {
    return this.actualizarFormulario.asObservable();
  }

  obtenerMateria(ige: any) {
    this.http.get(`${this.myAppUrl}materias/?igeCurso=${ige}`).toPromise()
      .then((da: any) => {
        this.da = da[0];
        this.mat = this.da as Materia;
        //this.da.map((d) => d.)
        //this.mat = da as Materia;
        console.log("obtener materia data", this.mat)
      })
  }

  obtenerMateria1(ige: number) {
    return this.http.get(`${this.myAppUrl}materias/?igeCurso=${ige}`)
    //   .then(data => {
    //    this.curso = data as any;
    //    //console.log(this.listCursos)

    //  });
  }

  obtenerAsistencia(idClase: number, ige: number) {
    return this.http.get(`${this.myAppUrl}asistencias/?claseId=${idClase}&igeId=${ige}`)
    //   .then(data => {
    //    this.curso = data as any;
    //    //console.log(this.listCursos)

    //  });
  }
  agregarClase(clase: Clases)
    {
      this.http.post(`${this.myAppUrl}clases/`, clase).subscribe(
        data => {
          console.log('POST Request is successful ', data);
        },
        error => {
          console.log('Error', error);
        }
      );
  }
  editarClase(clase: Clases)
    {
      this.http.put(`${this.myAppUrl}clases/${clase.id}`, clase).subscribe(
        data => {
          console.log('PUT Request is successful ', data);
        },
        error => {
          console.log('Error', error);
        }
      );
  }
}
