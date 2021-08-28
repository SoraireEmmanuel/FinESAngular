import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Clases } from 'src/app/models/clases';
import { Curso } from 'src/app/models/curso';
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
  curso:any = {
    turno:'',cicloLectivo:'', sedeId:''
  };
  fecha='12/11/21';
  alumnos:any []=[
    {nombre:'pepe', presente:'true', nota1:'5', nota2: '6', notaFinal: '7'},
    {nombre:'ana', presente:'true', nota1:'5', nota2: '8', notaFinal: '8'},
    {nombre:'pablo', presente:'true', nota1:'7', nota2: '7', notaFinal: '8'}];

  materia=
    {nombre:'Historia',nivel:'2°',cuatrimestre:'1c'}
  ;
  prueba:any;
  //curso:any;
  res:any;
  //clases1:any;
  clase: any;
  idClase='';
  idCurso='';

  constructor(private fb: FormBuilder,
     public cursoContenidoService: CursoContenidoService,
    private toastr: ToastrService) {

    this.form = fb.group({
      id:new FormControl(['']),
      claseNombre: new FormControl(['']),
      claseFecha: new FormControl (['']),
      claseTema:new FormControl (['']),
    });
  }


  ngOnInit(): void {

    this.subscription = this.cursoContenidoService.obtenerDato$().subscribe( data => {
      //Cargo curso **********
      console.log("data desde ccursoPResenNo",data);
      this.cursoContenidoService.obtenerCurso1(data).subscribe( res=>{
          this.curso=res;
          console.log("es la rest de ob curso",res,"this curso",this.curso);
            // Termian carga curso*******

            //cargo clases ***
          this.clases1 = this.curso.clases;
          console.log("clases",this.clases1);
          this.completarClase();

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
        claseNombre: this.clases1[this.idClase].nombre,
        claseFecha: this.clases1[this.idClase].fecha,
        claseTema: this.clases1[this.idClase].tema
      });
    }



  guardarCambios(){
  }

  cargarCurso(id:number){

  }

    changeForm(e:any){
      //console.log(e);
      //console.log(e.target.options.selectedIndex)
      this.idClase=e.target.options.selectedIndex;
      console.log(this.idClase);
      this.completarClase();

    }
    obtenerClases(id:number){
  //   if(this.clases1 === 0 || this.clases1 === undefined){
  //         this.cursoContenidoService.obtenerCurso(id);
  //       this.res = this.cursoContenidoService.curso;
  //       //console.log(this.res.clases[0]);
  //       this.clases1 = this.res.clases;
  //         console.log(this.clases1);
  //         this.completarClase();
  //     }

   }

}
