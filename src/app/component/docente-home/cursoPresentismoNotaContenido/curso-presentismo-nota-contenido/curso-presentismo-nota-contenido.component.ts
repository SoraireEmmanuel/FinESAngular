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
  //curso:any;
  res: any;
  //clases1:any;
  clases: any;
  idClase: number;
  idCurso = '';
  da: object;
  igeCurso: any;
  claseTest: Clases;
  clase1: Clases;
  //alumnoPresente: any;
  claseNm: string;
  claseNmtext: string;
  fecha:Date;
  tema:string;
  accion:string;
  enableEdit = false;
  enableEditIndex = null;
  Nota1: any;
  Nota2:any;
  NotaFinal: any;
  nota:Nota;
  AlumnoNombre:any;
  AlumnoApellido:any;


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

    this.claseNm='';

  }
  ngOnInit(): void {
    this.subscription = this.cursoContenidoService.obtenerDato$().subscribe(data => {
      //Cargo curso **********
      console.log("data desde ccursoPResenNo", data);
      this.cursoContenidoService.obtenerCurso1(localStorage.getItem('idCurso')).subscribe((res:any) => {
        this.curso = res[0] as Curso;
        this.obtenerNotas(localStorage.getItem('idCurso'));
        this.cursoContenidoService.obtenerClases(localStorage.getItem('idCurso'));

        console.log("es la rest de ob curso", res, "this curso", this.curso);
        // Termian carga curso*******
        //cargo clases ***
        console.log("ige", this.curso.IGE);
        this.igeCurso = this.curso.IGE;
        this.obtenerMateria(localStorage.getItem('idCurso'));
        this.obtenerClases(localStorage.getItem('idCurso'));
        this.clases = this.cursoContenidoService.listClases;

        //this.completarClase(thi);
        // this.form.patchValue({
        //   claseNombre: this.clases[this.idClase].nombre,
        //   claseFecha: this.clases[this.idClase].fecha,
        //   claseTema: this.clases[this.idClase].tema
        // });
      });
    });
    this.accion='editar'
  }
  ngAfterViewInit(): void {
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.cursoContenidoService.asist='';
  }

  changeForm(e: any, ige: any, idCurso:any) {
   // this.cursoContenidoService.obtenerAsistencia1(ige);
console.log("entro al change");
    console.log(e);
    console.log(e.target.options.selectedIndex)
    this.idClase = e.target.options.selectedIndex;
    //this.idClase = this.cursoContenidoService.listClases[this.idClase].Id_Clase;
    this.completarClase(this.cursoContenidoService.listClases[this.idClase], idCurso);
    // this.igeCurso = this.clases[this.idClase].igeCurso;
    // console.log(this.idClase, "id clase", this.igeCurso, "ige curso");
    // this.obtenerAsistencia(this.idClase, ige);
    // this.cursoContenidoService.obtenerClase(this.idClase, this.igeCurso).subscribe((data: any) => {
    //   console.log(data, "data de clase")
    //   this.da = data[0];
    //   this.clase1 = this.da as Clases;
    //   console.log(this.clase1, "changeform clase1 de data");
    //   this.completarClase(this.clase1);
    // });
    //this.obtenerAsistencias(this.idClase, ige);


  }
  completarClase(clase: Clases, idClase:any) {
    console.log("clases del comp completar clase", clase);
    this.form.patchValue({
      claseNombre: clase.Titulo,
      claseFecha: clase.Fecha ,
      claseTema: clase.Contenido
    });
    this.claseNm = clase.Titulo;
    this.cursoContenidoService.obtenerAsistencia1(idClase);
  }

  cargarCurso(id: any) {
  }
  obtenerClases(Id_Curso: any) {
    //   if(this.clases === 0 || this.clases === undefined){
    //         this.cursoContenidoService.obtenerCurso(id);
    //       this.res = this.cursoContenidoService.curso;
    //       //console.log(this.res.clases[0]);
    //       this.clases = this.res.clases;
    //         console.log(this.clases);
    //         this.completarClase();
    //     }
    this.cursoContenidoService.obtenerClases(Id_Curso);
    this.clases = this.cursoContenidoService.listClases;
    console.log("funciion de obtener clases ejecutada", this.clases)
  }

  obtenerMateria(idCurso: any) {
    console.log("Materia del componente", this.materia);
    this.cursoContenidoService.obtenerMateria1(idCurso).subscribe(
      (da: any) => {
        this.da = da[0];
        console.log("da", da)
        console.log("this.da", this.da)
        this.materia = this.da as Materia;
        // console.log("respuesta obtener materia", mat);
        //this.materia=mat as Materia;
        ;
        console.log("Materia del componente2", this.materia)
        //);
      })
  }
  // obtenerAsistencias(claseId: number, igeCurso: number) {
  //   console.log("Asistencias del componente", this.asistencia);
  //   this.cursoContenidoService.obtenerAsistencia(claseId, igeCurso).subscribe(
  //     (dat: any) => {
  //       this.asistencia = dat as Asistencia;
  //       // this.da=da;
  //       // console.log("da",da)
  //       console.log("this.asistencias viejo", this.asistencia)
  //         // console.log("respuesta obtener materia", mat);
  //         //this.materia=mat as Materia;
  //         ;
  //       console.log("Materia del componente2", this.materia);
  //       //console.log(this.alumnoPresente,"alumno presente");
  //       //);
  //     })
  // }

  obtenerNotas(idCurso: any) {
    console.log("notas del componente", this.notas, idCurso);
    this.cursoContenidoService.obtenerNotas(idCurso);
    this.notas = this.cursoContenidoService.notas;

  }

  obtenerAsistencia(claseId: any, igeCurso: any) {
    console.log("Asistencias del componente", this.asistencia1);
     this.cursoContenidoService.obtenerAsistencia1(claseId);
     this.asistencia1 = this.cursoContenidoService.asist;
     //.subscribe(
    //   (dat: any) => {
    //     this.asistencia1 = dat as Asistencia;
    //     // this.da=da;
    //     // console.log("da",da)
    //     console.log("this.asistencia nuevo sin presente", this.asistencia1)
    //       // console.log("respuesta obtener materia", mat);
    //       //this.materia=mat as Materia;
    //       ;
    //     console.log("Materia del componente2", this.materia);
    //     //console.log(this.alumnoPresente,"alumno presente");
    //     //);
    //   })
  }

  // cargarClase() { //tengo q enviarle por param la clase y eliminar la prueba.
  //   this.claseTest.Id_Clase = 198;
  //   this.claseTest.Titulo = "test put";
  //   this.claseTest.Fecha = "15/11/2021";
  //   this.claseTest.Contenido = "Ninguno";
  //   console.log(this.claseTest);
  //   // this.cursoContenidoService.agregarClase(this.claseTest)
  // }

  ejecutarAccion(a:string){
    this.accion=a;
  }
  enableEditMethod(e:any, i:any) {
    this.enableEdit = true;
    this.enableEditIndex = i;
    console.log(i, e);
    console.log(this.cursoContenidoService.notas[i]);
    this.Nota1=(this.cursoContenidoService.notas[i].Nota1);
    this.Nota2=(this.cursoContenidoService.notas[i].Nota2);
    this.NotaFinal=(this.cursoContenidoService.notas[i].NotaFinal);
    this.AlumnoNombre=(this.cursoContenidoService.notas[i].AlumnoNombre);
    this.AlumnoApellido=(this.cursoContenidoService.notas[i].AlumnoApellido);
    this.nota.Id_Cursada=(this.cursoContenidoService.notas[i].Id_Cursada);
    //this.nota.nya=(this.cursoContenidoService.notas[i].nya);
    //console.log(this.nota.nya.replace(' ',"%"))
  }
  saveSegment(){
    this.Nota1=parseInt(this.Nota1);
    console.log(this.Nota1, this.Nota2, this.NotaFinal);
    this.nota={
    Id_Cursada:  this.nota.Id_Cursada,


     Nota1 :this.Nota1,
     Nota2 :this.Nota2,
     NotaFinal : this.NotaFinal
    }
    this.nota=(this.nota) as Nota;
    console.log(this.nota,"this.nota")
    this.cursoContenidoService.editarNota(this.nota.Id_Cursada, localStorage.getItem('idCurso'),this.nota);

    this.enableEdit = false;
    this.enableEditIndex = null;
    this.cursoContenidoService.obtenerNotas(localStorage.getItem('idCurso'));
    //this.Nota1=null;

    console.log("save")
  }
  cancel(){
    this.enableEdit = false;
    this.enableEditIndex = null;

  }
  actualizarCurso(est:any){

    if (this.cursoContenidoService.vista===false) {
      this.cursoContenidoService.vista=true

    } else {
      this.cursoContenidoService.vista=false

    }
   // this.cursoContenidoService.vista="inactivo";
    console.log("cerrar curso",this.curso);
    this.cursoContenidoService.actualizarCursoEstado(this.curso.Id_Curso,est)
  }

  guardarCambios(e:any) {
    console.log(this.idClase,"titulo: ",this.claseNm, " fecha: ",this.fecha, "tema: ", this.tema)
  this.clase1 =this.cursoContenidoService.listClases[this.idClase];
  this.clase1.Fecha=this.fecha;
  this.clase1.Titulo=this.claseNm;
  this.clase1.Contenido=this.tema;
  this.cursoContenidoService.actualizarClase(this.clase1)
  }
}
