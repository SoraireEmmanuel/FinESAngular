import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Asistencia } from '../models/asistencia';
import { Clases } from '../models/clases';
import { Curso } from '../models/curso';
import { Materia } from '../models/materia';
import { Nota } from '../models/nota';

@Injectable({
  providedIn: 'root'
})
export class CursoContenidoService {
  //myAppUrl = 'http://localhost:3000/';
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


  constructor(private http: HttpClient) {
    this.vista = false;
    this.idDocente = localStorage.getItem('idUsuario');
  }

  // obtenerCursos() {
  //   this.http.get(this.myAppUrl + 'cursos').toPromise()
  //     .then(data => {
  //       this.listCursos = data as any;
  //       //console.log(this.listCursos)

  //     });

  // }
  obtenerCursos1() {

    return this.http.get(`${this.newAPI}CursosByIdDocente/${this.idDocente}`)
    //this.http.get(this.myAppUrl + 'cursos')
  }

  obtenerClases(idCurso: any) {
    this.http.get(`${this.newAPI}TodasLasClasesPorCurso/${idCurso}`).toPromise()
      .then(data => {
        this.listClases = data as Clases
        console.log("resultado obtener clases", this.listClases);
      })
    return this.listClases
  }
  obtenerClase(idclase: any, ige: any) {
    return this.http.get(`${this.newAPI}VerInfoClaseByClaseID/${idclase}`)
    //this.http.get(`${this.myAppUrl}clases?id=${idclase}&igeCurso=${ige}`)
  }
  // obtenerCurso(id: number){
  //    this.http.get(`${this.myAppUrl}cursos/${id}`).toPromise()
  //    .then(data => {
  //     this.curso = data as any;
  //     //console.log(this.listCursos)

  //   });
  // }
  obtenerCurso1(id: any) {
    return this.http.get(`${this.newAPI}CursosByIdCurso/${id}`)
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

  // obtenerMateria(ige: any) {
  //   this.http.get(`${this.myAppUrl}materias/?igeCurso=${ige}`).toPromise()
  //     .then((da: any) => {
  //       this.da = da[0];
  //       this.mat = this.da as Materia;
  //       //this.da.map((d) => d.)
  //       //this.mat = da as Materia;
  //       console.log("obtener materia data", this.mat)
  //     })
  // }

  obtenerMateria1(idCurso: any) {
    return this.http.get(`${this.newAPI}MateriaPorIge/${idCurso}`)
    //   .then(data => {
    //    this.curso = data as any;
    //    //console.log(this.listCursos)

    //  });
  }

  obtenerAsistencia(idClase: number, ige: any) {
    return this.http.get(`${this.myAppUrl}asistencias/?claseId=${idClase}&igeId=${ige}`)
    //   .then(data => {
    //    this.curso = data as any;
    //    //console.log(this.listCursos)

    //  });
  }
  obtenerAsistencia1(idClase: number, ige: any) {
    this.http.get(`${this.myAppUrl}asistencia/?claseId=${idClase}&igeId=${ige}`).toPromise()
      .then(
        (dat: any) => {
          this.asist = dat as Asistencia;
          // this.da=da;
          // console.log("da",da)
          console.log("this.asistencia nuevo sin presente", this.asist)
            // console.log("respuesta obtener materia", mat);
            //this.materia=mat as Materia;
            ;

          //console.log(this.alumnoPresente,"alumno presente");
          //);
        });
    return this.asist;
    //   .then(data => {
    //    this.curso = data as any;
    //    //console.log(this.listCursos)

    //  });
  }
  obtenerNotas(idCurso: any) {
    //this.http.get(`${this.myAppUrl}notas/?igeId=${ige}`).toPromise()
    this.http.get(`${this.newAPI}NotasByCursoId/${idCurso}`).toPromise()
      .then((dat: any) => {
        this.notas = dat as Nota;
        // this.da=da;
        // console.log("da",da)
        console.log("this.notas ", this.notas)
          // console.log("respuesta obtener materia", mat);
          //this.materia=mat as Materia;
          ;
        //  console.log("Materia del componente2", this.materia);
        //console.log(this.alumnoPresente,"alumno presente");
        //);
      })
    return this.notas;
    //   .then(data => {
    //    this.curso = data as any;
    //    //console.log(this.listCursos)

    //  });
  }
  agregarClase(clase: Clases) {
    this.http.post(`${this.myAppUrl}clases/`, clase).subscribe(
      data => {
        console.log('POST Request is successful ', data);
      },
      error => {
        console.log('Error', error);
      }
    );
  }
  editarClase(clase: Clases) {
    this.http.put(`${this.myAppUrl}clases/${clase.id}`, clase).subscribe(
      data => {
        console.log('PUT Request is successful ', data);
      },
      error => {
        console.log('Error', error);
      }
    );
  }
  editarNota(id: string, ige: any, nota: Nota) {
    this.http.put(`${this.myAppUrl}notas/${id}`, nota).toPromise()
      .then(
        data => {
          console.log('PUT Request is successful ', data);
          this.obtenerNotas(ige);
          console.log("doneeee");
        },
        error => {
          console.log('Error', error);
        }
      ).then((d: any) => {
        this.obtenerNotas(ige);
        console.log("doneeee3333");
      }
      );

  }
  actualizarCursoEstado(curso: any, estado: string) {
    console.log(curso);
    curso.estado = estado;
    this.http.put(`${this.myAppUrl}cursos/${curso.id}`, curso).toPromise()
      .then(
        data => {
          console.log('PUT Request is successful ', data);
          this.obtenerCursos1();
          console.log("estado actualizado");
        },
        error => {
          console.log('Error', error);
        })
  }
  actualizarClase(clase: any) {

    this.http.put(`${this.myAppUrl}cursos/${clase.id}`, clase).toPromise()
      .then(
        data => {
          console.log('PUT Request is successful ', data);
          this.obtenerCursos1();
          console.log("clase actualizado");
        },
        error => {
          console.log('Error', error);
        })
  }
}

