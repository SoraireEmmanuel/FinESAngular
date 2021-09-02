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
  listCursos: any[];
  listMaterias: any[];
  listClases: any;
  curso: any;
  mat: Materia;
  da: object;
  vista:string;
  clase: Clases;
  asist:any;
  notas:any;


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
     this.http.get(`${this.myAppUrl}clases?igeCurso=${ige}`).toPromise()
      .then(data => {
        this.listClases = data as Clases
        console.log("resultado obtener clases", this.listClases);
      })
      return this.listClases
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
  obtenerAsistencia1(idClase: number, ige: number) {
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
  obtenerNotas(ige: number) {
     this.http.get(`${this.myAppUrl}notas/?igeId=${ige}`).toPromise()
      .then( (dat: any) => {
        this.notas = dat as Asistencia;
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
  editarNota(id: string,ige:any,nota:Nota)
    {
      this.http.put(`${this.myAppUrl}notas/${id}`, nota).toPromise()
      .then(
        data => {
          console.log('PUT Request is successful ', data);
        },
        error => {
          console.log('Error', error);
        }
      );
      
  }
}

