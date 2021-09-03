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
  igeCurso: number;
  claseTest: Clases;
  clase1: Clases;
  //alumnoPresente: any;
  claseNm: string;
  accion:string;
  enableEdit = false;
  enableEditIndex = null;
  nota1: any;
  nota2:any;
  notaFinal: any;
  nota:Nota;


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
      this.cursoContenidoService.obtenerCurso1(data).subscribe(res => {
        this.curso = res as Curso;
        this.obtenerNotas(this.curso.ige);
        this.cursoContenidoService.obtenerClases(this.curso.ige);

        console.log("es la rest de ob curso", res, "this curso", this.curso);
        // Termian carga curso*******
        //cargo clases ***
        console.log("ige", this.curso.ige);
        this.igeCurso = this.curso.ige;
        this.obtenerMateria(this.curso.ige);
        this.obtenerClases(this.curso.ige);
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

  changeForm(e: any, ige: number) {
   // this.cursoContenidoService.obtenerAsistencia1(ige);
console.log("entro al change");
    console.log(e);
    console.log(e.target.options.selectedIndex)
    this.idClase = e.target.options.selectedIndex;
    this.idClase = this.cursoContenidoService.listClases[this.idClase].id;
    this.completarClase(this.cursoContenidoService.listClases[this.idClase]);
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
  completarClase(clase: Clases) {
    console.log("clases del comp completar clase", clase);
    this.form.patchValue({
      claseNombre: clase.nombre,
      claseFecha: clase.fecha,
      claseTema: clase.tema
    });
    this.claseNm = clase.nombre;
    this.cursoContenidoService.obtenerAsistencia1(this.idClase, this.igeCurso);
  }
  guardarCambios() {
  }
  cargarCurso(id: number) {
  }
  obtenerClases(ige: number) {
    //   if(this.clases === 0 || this.clases === undefined){
    //         this.cursoContenidoService.obtenerCurso(id);
    //       this.res = this.cursoContenidoService.curso;
    //       //console.log(this.res.clases[0]);
    //       this.clases = this.res.clases;
    //         console.log(this.clases);
    //         this.completarClase();
    //     }
    this.cursoContenidoService.obtenerClases(ige);
    this.clases = this.cursoContenidoService.listClases;
    console.log("funciion de obtener clases ejecutada", this.clases)
  }

  obtenerMateria(igeCurso: number) {
    console.log("Materia del componente", this.materia);
    this.cursoContenidoService.obtenerMateria1(igeCurso).subscribe(
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

  obtenerNotas(igeCurso: number) {
    console.log("notas del componente", this.notas, igeCurso);
    this.cursoContenidoService.obtenerNotas(igeCurso);
    this.notas = this.cursoContenidoService.notas;

  }

  obtenerAsistencia(claseId: number, igeCurso: number) {
    console.log("Asistencias del componente", this.asistencia1);
     this.cursoContenidoService.obtenerAsistencia1(claseId, igeCurso);
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

  cargarClase() { //tengo q enviarle por param la clase y eliminar la prueba.
    this.claseTest.id = 198;
    this.claseTest.nombre = "test put";
    this.claseTest.fecha = "15/11/2021";
    this.claseTest.tema = "Ninguno";
    console.log(this.claseTest);
    this.cursoContenidoService.agregarClase(this.claseTest)
  }

  ejecutarAccion(a:string){
    this.accion=a;
  }
  enableEditMethod(e:any, i:any) {
    this.enableEdit = true;
    this.enableEditIndex = i;
    console.log(i, e);
    console.log(this.cursoContenidoService.notas[i]);
    this.nota1=(this.cursoContenidoService.notas[i].nota1);
    this.nota2=(this.cursoContenidoService.notas[i].nota2);
    this.notaFinal=(this.cursoContenidoService.notas[i].notaFinal);
    this.nota.nya=(this.cursoContenidoService.notas[i].nya);
    this.nota.igeId=(this.cursoContenidoService.notas[i].igeId);
    this.nota.id=(this.cursoContenidoService.notas[i].id);
    this.nota.nya=(this.cursoContenidoService.notas[i].nya);
    //console.log(this.nota.nya.replace(' ',"%"))
  }
  saveSegment(){
    this.nota1=parseInt(this.nota1);
    console.log(this.nota1, this.nota2, this.notaFinal);
    this.nota={
    id:  this.nota.id,
     nya : this.nota.nya,
     igeId : this.nota.igeId,
     nota1 :this.nota1,
     nota2 :this.nota2,
     notaFinal : this.notaFinal
    }
    this.nota=(this.nota) as Nota;
    console.log(this.nota,"this.nota")
    this.cursoContenidoService.editarNota(this.nota.id, this.nota.igeId,this.nota);

    this.enableEdit = false;
    this.enableEditIndex = null;
    this.cursoContenidoService.obtenerNotas(this.igeCurso);
    //this.nota1=null;

    console.log("save")
  }
  cancel(){
    this.enableEdit = false;
    this.enableEditIndex = null;

  }
  actualizarCurso(est:string){
  
    if (this.cursoContenidoService.vista==="inactivo") {
      this.cursoContenidoService.vista="activo"
    
    } else {
      this.cursoContenidoService.vista="inactivo"
    
    }
   // this.cursoContenidoService.vista="inactivo";
    console.log("cerrar curso",this.curso);
    this.cursoContenidoService.actualizarCursoEstado(this.curso,est)
  }
  // abrirCurso(){
  //   this.cursoContenidoService.vista="activo";
  //   console.log("cerrar curso",this.curso);
  //   this.cursoContenidoService.cerrarCursoEstado(this.curso)
  // }
}
