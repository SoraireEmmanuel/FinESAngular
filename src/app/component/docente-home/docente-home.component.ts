import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CursoContenidoService } from 'src/app/services/curso-contenido.service';

@Component({
  selector: 'app-docente-home',
  templateUrl: './docente-home.component.html',
  styleUrls: ['./docente-home.component.css']
})
export class DocenteHomeComponent implements OnInit {

  constructor(private router:Router,
    public cursoContenidoService: CursoContenidoService) { }

  ngOnInit(): void {
  }

  
  estado(estado:string){
    this.cursoContenidoService.vista=estado;
    console.log(this.cursoContenidoService.vista,"vista:");
    this.router.navigate(['miscursos']);
  }

}
