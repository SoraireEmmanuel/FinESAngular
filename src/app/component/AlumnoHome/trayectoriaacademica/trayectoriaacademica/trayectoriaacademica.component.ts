import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrayectoriaAcademicaService } from 'src/app/services/trayectoriaAcademica/trayectoria-academica.service';

@Component({
  selector: 'app-trayectoriaacademica',
  templateUrl: './trayectoriaacademica.component.html',
  styleUrls: ['./trayectoriaacademica.component.css']
})
export class TrayectoriaacademicaComponent implements OnInit {
materias:any;
materias11:any=[];
materias12:any=[];
materias21:any=[];
materias22:any=[];
materias31:any=[];
materias32:any=[];

p1:any=false;
p2:any=false;
p3:any=false;
  constructor(private _route:Router, private _trayectoria:TrayectoriaAcademicaService) {
    _trayectoria.verTrayectoriaAcademica(localStorage.getItem('idUsuario')).subscribe(
      resp=>{
        this.materias=resp;
        for (let element of this.materias){
          if(element.Anio=='1' && element.Cuatrimestre=='1'){
            this.materias11.push(element);
          }
          if(element.Anio=='1' && element.Cuatrimestre=='2'){
            this.materias12.push(element);
          }
          if(element.Anio=='2' && element.Cuatrimestre=='1'){
            this.materias21.push(element);
          }
          if(element.Anio=='2' && element.Cuatrimestre=='2'){
            this.materias22.push(element);
          }
          if(element.Anio=='3' && element.Cuatrimestre=='1'){
            this.materias31.push(element);
          }
          if(element.Anio=='3' && element.Cuatrimestre=='2'){
            this.materias32.push(element);
          }

        }
      }
    )
  }

  ngOnInit(): void {
  }

  verMateria(id:any){
    this._route.navigate(['/vermateria',id])
  }
cerrar(c:any, c2:any){

}
mostrarP1(){
  if (this.p1==true) {
this.p1=false
  }else{
  this.p1=true}
}
mostrarP2(){
  if (this.p2==true) {
this.p2=false
  }else{
  this.p2=true}
}

mostrarP3(){
  if (this.p3==true) {
this.p3=false
  }else{
  this.p3=true}
}


}
