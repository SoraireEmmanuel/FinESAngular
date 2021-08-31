import { Component, OnInit } from '@angular/core';
import { CursoContenidoService } from 'src/app/services/curso-contenido.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public cursoContenidoService: CursoContenidoService) { }

  ngOnInit(): void {
  }
  estado(estado:string){
    this.cursoContenidoService.vista=estado;
    console.log(this.cursoContenidoService.vista,"vista:")
  }

}
