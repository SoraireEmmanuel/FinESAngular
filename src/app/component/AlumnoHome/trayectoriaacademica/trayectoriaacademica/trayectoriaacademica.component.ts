import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trayectoriaacademica',
  templateUrl: './trayectoriaacademica.component.html',
  styleUrls: ['./trayectoriaacademica.component.css']
})
export class TrayectoriaacademicaComponent implements OnInit {
primerocuatri1=[{nombre:"Matematica", estado: "Aprobada"}, {nombre:"Historia", estado: "Aprobada"}, {nombre:"Matematica", estado: "Aprobada"}, {nombre:"Matematica", estado: "Aprobada"}]
primerocuatri2=[{nombre:"Matematica", estado: "Aprobada"}, {nombre:"Historia", estado: "Aprobada"}, {nombre:"Matematica", estado: "Aprobada"}, {nombre:"Matematica", estado: "Aprobada"}]
segundocuatri1=[{nombre:"Matematica", estado: "En Curso"}, {nombre:"Matematica", estado: "En Curso"}, {nombre:"Matematica", estado: "En Curso"}, {nombre:"Matematica", estado: "En Curso"}]
segundocuatri2=[{nombre:"Matematica", estado: "En Curso"}, {nombre:"Matematica", estado: "No Cursada"}, {nombre:"Matematica", estado: "No Cursada"}, {nombre:"Matematica", estado: "No Cursada"}]
tercerocuatri1=[{nombre:"Matematica", estado: "No Cursada"}, {nombre:"Matematica", estado: "No Cursada"}, {nombre:"Matematica", estado: "No Cursada"}, {nombre:"Matematica", estado: "No Cursada"}]
tercerocuatri2=[{nombre:"Matematica", estado: "No Cursada"}, {nombre:"Matematica", estado: "No Cursada"}, {nombre:"Matematica", estado: "No Cursada"}, {nombre:"Matematica", estado: "No Cursada"}]
  constructor(private _route:Router) { }

  ngOnInit(): void {
  }

  verMateria(id:any,anio:string,cuatri:string){
    this._route.navigate(['/vermateria'])

  }


}
