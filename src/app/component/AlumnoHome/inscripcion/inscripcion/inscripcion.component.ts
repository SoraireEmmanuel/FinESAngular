import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.css']
})
export class InscripcionComponent implements OnInit {
materia:string ='Matematica';
zona=['Zona1','Zona2','Zona3','Zona4']
censsede=['sede1','sede2']

  constructor() { }

  ngOnInit(): void {
  }

}
