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
  clases1:any=[
    {nombre:'Clase 1', fecha: '12/11/21', claseTema:'Descripcion del tema dado',}
  ];
  curso:Curso ;
  fecha='12/11/21';
  // alumnos:any []=[
  //   {nombre:'pepe', presente:'true', nota1:'5', nota2: '6', notaFinal: '7'},
  //   {nombre:'ana', presente:'true', nota1:'5', nota2: '8', notaFinal: '8'},
  //   {nombre:'pablo', presente:'true', nota1:'7', nota2: '7', notaFinal: '8'}];

    asistencia: any;
  materia: Materia;
    //{nombre:'Historia',nivel:'2°',cuatrimestre:'1c'}
  ;
  prueba:any;
  //curso:any;
  res:any;
  //clases1:any;
  clases: any;
  idClase=-1;
  idCurso='';
  da: object;

  constructor(private fb: FormBuilder,
     public cursoContenidoService: CursoContenidoService,
    private toastr: ToastrService) {

    this.form = fb.group({
      id:new FormControl(['']),
      claseNombre: new FormControl(['']),
      claseFecha: new FormControl (['']),
      claseTema:new FormControl (['']),
    });
    this.materia = new Materia();
    this.curso = new Curso();
    this.clases = new Clases();
    this.asistencia = new Asistencia();
    console.log("clases del contruc",this.clases)
  }


  ngOnInit(): void {

    this.subscription = this.cursoContenidoService.obtenerDato$().subscribe( data => {
      //Cargo curso **********
      console.log("data desde ccursoPResenNo",data);
      this.cursoContenidoService.obtenerCurso1(data).subscribe( res=>{
          this.curso=res as Curso;
          console.log("es la rest de ob curso",res,"this curso",this.curso);
            // Termian carga curso*******

            //cargo clases ***


          console.log("ige",this.curso.ige);
          this.obtenerMateria(this.curso.ige);
          this.obtenerClases(this.curso.ige);
          this.completarClase();

          // this.form.patchValue({
          //   claseNombre: this.clases[this.idClase].nombre,
          //   claseFecha: this.clases[this.idClase].fecha,
          //   claseTema: this.clases[this.idClase].tema
          // });


      });

      });


  }




  ngAfterViewInit(): void{

  }

  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }



  completarClase(){
      this.form.patchValue({
        claseNombre: this.clases[this.idClase].nombre,
        claseFecha: this.clases[this.idClase].fecha,
        claseTema: this.clases[this.idClase].tema
      });
      this.obtenerAsistencias(this.idClase);
    }



  guardarCambios(){
  }

  cargarCurso(id:number){

  }

    changeForm(e:any){
      //console.log(e);
      //console.log(e.target.options.selectedIndex)
      this.idClase=e.target.options.selectedIndex;
      console.log(this.idClase,"id clase");
      this.completarClase();
      this.obtenerAsistencias(this.idClase)

    }
    obtenerClases(ige:number){
  //   if(this.clases === 0 || this.clases === undefined){
  //         this.cursoContenidoService.obtenerCurso(id);
  //       this.res = this.cursoContenidoService.curso;
  //       //console.log(this.res.clases[0]);
  //       this.clases = this.res.clases;
  //         console.log(this.clases);
  //         this.completarClase();
  //     }
  this.cursoContenidoService.obtenerClases(ige).subscribe(data=>{

    this.clases=data as Clases
    console.log("resultado obtener clases",this.clases );
  })

   }

   obtenerMateria(igeCurso:number){
      console.log("Materia del componente",this.materia);
    this.cursoContenidoService.obtenerMateria1(igeCurso).subscribe(
      (da : any) => {
        this.da=da[0];
        console.log("da",da)
        console.log("this.da",this.da)
        this.materia=this.da as Materia;
     // console.log("respuesta obtener materia", mat);
      //this.materia=mat as Materia;
     ;



      console.log("Materia del componente2",this.materia)

  //);

   })}

   obtenerAsistencias(claseId:number){
    console.log("Asistencias del componente",this.asistencia);
  this.cursoContenidoService.obtenerAsistencia(claseId).subscribe(
    (dat : any) => {
      this.asistencia=dat as Asistencia;
      // this.da=da;
      // console.log("da",da)
      console.log("this.asistencia",this.asistencia)

   // console.log("respuesta obtener materia", mat);
    //this.materia=mat as Materia;
   ;



    console.log("Materia del componente2",this.materia)

//);

 })}

}
