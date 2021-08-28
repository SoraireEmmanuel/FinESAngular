import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Curso } from '../models/curso';

@Injectable({
  providedIn: 'root'
})
export class CursoContenidoService {
  myAppUrl ='http://localhost:1337/';
  //myApiUrl = 'api/TarjetaCredito/';
  listCursos: any[];
  listMaterias: any[];
  listClases: any[];
  curso: any;
  private actualizarFormulario = new BehaviorSubject<any>({} as any);


  constructor(private http: HttpClient) { }

  obtenerCursos(){
    this.http.get(this.myAppUrl+'cursos').toPromise()
        .then(data => {
          this.listCursos = data as any;
          //console.log(this.listCursos)

        });

  }
  obtenerCursos1(){
  return this.http.get(this.myAppUrl+'cursos')
      }

  obtenerCurso(id: number){
     this.http.get(`${this.myAppUrl}cursos/${id}`).toPromise()
     .then(data => {
      this.curso = data as any;
      //console.log(this.listCursos)

    });
  }
  obtenerCurso1(id: number){
    return this.http.get(`${this.myAppUrl}cursos/${id}`)
  //   .then(data => {
  //    this.curso = data as any;
  //    //console.log(this.listCursos)

  //  });
 }
  actualizar(id: any){
    this.actualizarFormulario.next(id);
  }
  obtenerDato$(): Observable<any>{
    return this.actualizarFormulario.asObservable();
  }
}
