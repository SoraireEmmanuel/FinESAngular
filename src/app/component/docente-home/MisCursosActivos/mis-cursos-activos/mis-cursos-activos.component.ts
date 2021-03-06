import { Component, OnInit } from '@angular/core';
import { CursoContenidoService } from 'src/app/services/curso-contenido.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mis-cursos-activos',
  templateUrl: './mis-cursos-activos.component.html',
  styleUrls: ['./mis-cursos-activos.component.css']
})
export class MisCursosActivosComponent implements OnInit {
  prueba = ["1", "2", "3", "4"];
  cursos: any;
  idCurso = 0;
  idDocente = 7;
  constructor(public cursoContenidoService: CursoContenidoService,
    private router: Router) { }
  ngOnInit(): void {
    this.cursoContenidoService.obtenerCursos1().subscribe(data => {

      this.cursos = data as any;

    });
  }
  verDetalle(id: any) {
    localStorage.setItem('idCurso', id);

    this.idCurso = id;
    this.cursoContenidoService.actualizar(this.idCurso);
    this.router.navigate(['cursopresentismocontenido']);
  }
}
