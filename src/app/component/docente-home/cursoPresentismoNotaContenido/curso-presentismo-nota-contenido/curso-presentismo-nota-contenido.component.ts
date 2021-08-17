import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-curso-presentismo-nota-contenido',
  templateUrl: './curso-presentismo-nota-contenido.component.html',
  styleUrls: ['./curso-presentismo-nota-contenido.component.css']
})
export class CursoPresentismoNotaContenidoComponent implements OnInit {
  clase=['clase1', 'case2', 'clase3'];
alumno=[{nombre:'pepe'},{nombre:'ana'},{nombre:'pablo'}]

  constructor() { }

  ngOnInit(): void {
  }

}
