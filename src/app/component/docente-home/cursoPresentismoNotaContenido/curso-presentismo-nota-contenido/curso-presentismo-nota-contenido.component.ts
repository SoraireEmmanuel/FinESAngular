import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Asistencia } from 'src/app/models/asistencia';
import { Clases } from 'src/app/models/clases';
import { Curso } from 'src/app/models/curso';
import { Materia } from 'src/app/models/materia';
import { CursoContenidoService } from 'src/app/services/curso-contenido.service';

@Component({
  selector: 'app-curso-presentismo-nota-contenido',
  templateUrl: './curso-presentismo-nota-contenido.component.html',
  styleUrls: ['./curso-presentismo-nota-contenido.component.css']
})
export class CursoPresentismoNotaContenidoComponent implements OnInit, AfterViewInit, OnDestroy {
  form: FormGroup;
  subscription: Subscription;
  // clases1: any = [
  //   { nombre: 'Clase 1', fecha: '12/11/21', claseTema: 'Descripcion del tema dado', }
  // ];
  curso: Curso;
  // fecha = '12/11/21';

  asistencia: any;
  materia: Materia;

  prueba: any;
  //curso:any;
  res: any;
  //clases1:any;
  clases: any;
  idClase :number;
  idCurso = '';
  da: object;
  igeCurso: number;
  claseTest: Clases;
  clase: Clases;
  //alumnoPresente: any;
  claseNm:string;

  constructor(private fb: FormBuilder,
    public cursoContenidoService: CursoContenidoService,
    private toastr: ToastrService) {
      console.log(this.cursoContenidoService.vista,"vista:")

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
    this.idClase=-1;
    console.log("clases del contruc", this.clases)

  }


  ngOnInit(): void {

    this.subscription = this.cursoContenidoService.obtenerDato$().subscribe(data => {
      //Cargo curso **********
      console.log("data desde ccursoPResenNo", data);
      this.cursoContenidoService.obtenerCurso1(data).subscribe(res => {
        this.curso = res as Curso;
        console.log("es la rest de ob curso", res, "this curso", this.curso);
        // Termian carga curso*******

        //cargo clases ***


        console.log("ige", this.curso.ige);
        this.igeCurso=this.curso.ige;
        this.obtenerMateria(this.curso.ige);
        this.obtenerClases(this.curso.ige);
        //this.completarClase(thi);

        // this.form.patchValue({
        //   claseNombre: this.clases[this.idClase].nombre,
        //   claseFecha: this.clases[this.idClase].fecha,
        //   claseTema: this.clases[this.idClase].tema
        // });


      });

    });


  }




  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  changeForm(e: any, ige: number) {

    //console.log(e);
    //console.log(e.target.options.selectedIndex)
    this.idClase = e.target.options.selectedIndex;
    this.idClase=this.clases[this.idClase ].id;
    this.igeCurso=this.clases[this.idClase].igeCurso
    console.log(this.idClase, "id clase", this.igeCurso ,"ige curso");

    this.cursoContenidoService.obtenerClase(this.idClase, this.igeCurso).subscribe( (data:any) =>{
    console.log(data,"data de clase")
      this.da = data[0];
      this.clase = this.da as Clases;
      console.log(this.clase,"como clase de data");
      this.completarClase(this.clase);


    });

    this.obtenerAsistencias(this.idClase, ige)

  }

  completarClase(clase : Clases) {
    console.log("clases del comp completar clase",clase);

    this.form.patchValue({

      claseNombre: clase.nombre,
      claseFecha: clase.fecha,
      claseTema: clase.tema
    });
    this.claseNm=clase.nombre;
    this.obtenerAsistencias(this.idClase, this.igeCurso);
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
    this.cursoContenidoService.obtenerClases(ige).subscribe(data => {

      this.clases = data as Clases
      console.log("resultado obtener clases", this.clases);
    })

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

  obtenerAsistencias(claseId: number, igeCurso: number) {
    console.log("Asistencias del componente", this.asistencia);
    this.cursoContenidoService.obtenerAsistencia(claseId, igeCurso).subscribe(
      (dat: any) => {
        this.asistencia = dat as Asistencia;
        // this.da=da;
        // console.log("da",da)
        console.log("this.asistencia", this.asistencia)

          // console.log("respuesta obtener materia", mat);
          //this.materia=mat as Materia;
          ;



        console.log("Materia del componente2", this.materia);
        //console.log(this.alumnoPresente,"alumno presente");

        //);

      })
  }

  cargarClase(){ //tengo q enviarle por param la clase y eliminar la prueba.
    this.claseTest.id=198;
    this.claseTest.nombre="test put";
    this.claseTest.fecha="15/11/2021";
    this.claseTest.tema="Ninguno";
    console.log(this.claseTest);
    this.cursoContenidoService.agregarClase(this.claseTest)

  }

}
