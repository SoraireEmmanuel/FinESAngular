import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-curso-presentismo-nota-contenido',
  templateUrl: './curso-presentismo-nota-contenido.component.html',
  styleUrls: ['./curso-presentismo-nota-contenido.component.css']
})
export class CursoPresentismoNotaContenidoComponent implements OnInit {

  clases=[
    {nombre:'Clase 1', fecha: '12/11/21', tema:'Descripcion del tema dado',}
  ];
  curso = {
    turno:'tarde',cicloLectivo:'2021', sede:'451 - Bibliteca Guevara'
  };
  fecha='12/11/21';
  alumnos:any []=[
    {nombre:'pepe', presente:'true', nota1:'5', nota2: '6', notaFinal: '7'},
    {nombre:'ana', presente:'true', nota1:'5', nota2: '8', notaFinal: '8'},
    {nombre:'pablo', presente:'true', nota1:'7', nota2: '7', notaFinal: '8'}];

  materia=
    {nombre:'Historia',nivel:'2°',cuatrimestre:'1c'}
  ;


  constructor(private fb: FormBuilder,) { }

  ngOnInit(): void {
  }

}
