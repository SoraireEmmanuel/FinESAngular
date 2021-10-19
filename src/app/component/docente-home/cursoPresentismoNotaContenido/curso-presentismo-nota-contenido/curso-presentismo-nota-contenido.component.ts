import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Asistencia } from 'src/app/models/asistencia';
import { Clases } from 'src/app/models/clases';
import { Curso } from 'src/app/models/curso';
import { Materia } from 'src/app/models/materia';
import { Nota } from 'src/app/models/nota';
import { CursoContenidoService } from 'src/app/services/curso-contenido.service';
@Component({
  selector: 'app-curso-presentismo-nota-contenido',
  templateUrl: './curso-presentismo-nota-contenido.component.html',
  styleUrls: ['./curso-presentismo-nota-contenido.component.css']
})
export class CursoPresentismoNotaContenidoComponent implements OnInit, AfterViewInit, OnDestroy {
  form: FormGroup;
  subscription: Subscription;
  curso: Curso;
  asistencia1: any;
  asistencia: any;
  materia: Materia;
  prueba: any;
  notas: any;
  res: any;
  clases: any;
  idClase: number;
  idCurso = '';
  da: object;
  igeCurso: any;
  claseTest: Clases;
  clase1: Clases;
  claseNm: string;
  claseNmtext: string;
  fecha: Date;
  tema: string;
  accion: string;
  enableEdit = false;
  enableEditIndex = null;
  Nota1: any;
  Nota2: any;
  NotaFinal: any;
  nota: Nota;
  AlumnoNombre: any;
  AlumnoApellido: any;
  constructor(private fb: FormBuilder,
    public cursoContenidoService: CursoContenidoService,
    private toastr: ToastrService) {
    this.form = fb.group({
      id: new FormControl(['']),
      claseNombre: new FormControl(['']),
      claseFecha: new FormControl(['']),
      claseTema: new FormControl(['']),
    });
    this.materia = new Materia();
    this.curso = new Curso();
    this.clases = new Clases();
    this.claseTest = new Clases();
    this.asistencia = new Asistencia();
    this.asistencia1 = new Asistencia();
    this.nota = new Nota();
    this.idClase = -1;
    this.claseNm = '';
  }
  ngOnInit(): void {
    this.subscription = this.cursoContenidoService.obtenerDato$().subscribe(data => {

      this.cursoContenidoService.obtenerCurso1(localStorage.getItem('idCurso')).subscribe((res: any) => {
        this.curso = res[0] as Curso;
        this.obtenerNotas(localStorage.getItem('idCurso'));
        this.cursoContenidoService.obtenerClases(localStorage.getItem('idCurso'));


        this.igeCurso = this.curso.IGE;
        this.obtenerMateria(localStorage.getItem('idCurso'));
        this.obtenerClases(localStorage.getItem('idCurso'));
        this.clases = this.cursoContenidoService.listClases;
      });
    });
    this.accion = 'editar'
  }
  ngAfterViewInit(): void {
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.cursoContenidoService.asist = '';
  }
  changeForm(e: any, ige: any, idClase: any) {


    this.idClase = e.target.options.selectedIndex;
    this.completarClase(this.cursoContenidoService.listClases[this.idClase], idClase);
  }
  completarClase(clase: Clases, idClase: any) {

    var f =
      this.form.patchValue({
        claseNombre: clase.Titulo,
        claseFecha: clase.Fecha,
        claseTema: clase.Contenido
      });
    this.claseNm = clase.Titulo;
    this.cursoContenidoService.obtenerAsistencia1(idClase);
  }
  cargarCurso(id: any) {
  }
  obtenerClases(Id_Curso: any) {
    this.cursoContenidoService.obtenerClases(Id_Curso);
    this.clases = this.cursoContenidoService.listClases;
    //console.log("obtener clases", this.clases)

  }
  obtenerMateria(idCurso: any) {

    this.cursoContenidoService.obtenerMateria1(idCurso).subscribe(
      (da: any) => {
        this.da = da[0];


        this.materia = this.da as Materia;
        ;

      })
  }
  obtenerNotas(idCurso: any) {

    this.cursoContenidoService.obtenerNotas(idCurso);
    this.notas = this.cursoContenidoService.notas;
  }
  obtenerAsistencia(claseId: any, igeCurso: any) {

    this.cursoContenidoService.obtenerAsistencia1(claseId);
    this.asistencia1 = this.cursoContenidoService.asist;
    //console.log("obtener asistencia:", this.asistencia1)
  }
  ejecutarAccion(a: string) {
    this.accion = a;
  }
  enableEditMethod(e: any, i: any) {
    this.enableEdit = true;
    this.enableEditIndex = i;


    this.Nota1 = (this.cursoContenidoService.notas[i].Nota1);
    this.Nota2 = (this.cursoContenidoService.notas[i].Nota2);
    this.NotaFinal = (this.cursoContenidoService.notas[i].NotaFinal);
    this.AlumnoNombre = (this.cursoContenidoService.notas[i].AlumnoNombre);
    this.AlumnoApellido = (this.cursoContenidoService.notas[i].AlumnoApellido);
    this.nota.Id_Cursada = (this.cursoContenidoService.notas[i].Id_Cursada);
  }
  saveSegment() {
    this.Nota1 = parseInt(this.Nota1);

    this.nota = {
      Id_Cursada: this.nota.Id_Cursada,
      Nota1: this.Nota1,
      Nota2: this.Nota2,
      NotaFinal: this.NotaFinal
    }
    this.nota = (this.nota) as Nota;

    this.cursoContenidoService.editarNota(this.nota.Id_Cursada, localStorage.getItem('idCurso'), this.nota);
    this.enableEdit = false;
    this.enableEditIndex = null;
    this.cursoContenidoService.obtenerNotas(localStorage.getItem('idCurso'));

  }
  cancel() {
    this.enableEdit = false;
    this.enableEditIndex = null;
  }
  actualizarCurso(est: any) {
    if (this.cursoContenidoService.vista === false) {
      this.cursoContenidoService.vista = true
    } else {
      this.cursoContenidoService.vista = false
    }

    this.cursoContenidoService.actualizarCursoEstado(this.curso.Id_Curso, est)
  }
  guardarCambios(e?: any) {

    this.clase1 = this.cursoContenidoService.listClases[this.idClase];
    this.clase1.Fecha = this.fecha;
    this.clase1.Titulo = this.claseNm;

    this.clase1.Contenido = this.tema;

    this.cursoContenidoService.actualizarClase(this.clase1)

 }


}
