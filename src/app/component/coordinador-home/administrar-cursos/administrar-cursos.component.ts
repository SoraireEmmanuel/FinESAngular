import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DetalleCursoComponent } from '../detalle-curso/detalle-curso.component';
import { CrearCursoComponent } from '../crear-curso/crear-curso.component';

@Component({
  selector: 'app-administrar-cursos',
  templateUrl: './administrar-cursos.component.html',
  styleUrls: ['./administrar-cursos.component.css'],
  providers: [DetalleCursoComponent, CrearCursoComponent]
})
export class AdministrarCursosComponent implements OnInit {
  API_URL = "https://apifines.azurewebsites.net/api";

  materias: any;
  cens: any;
  sedes: any;
  selectedCens: any;
  selectedSede: any;
  cursos: any;

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.http.get(`${this.API_URL}/VerCens`).subscribe(
      data => this.cens = data as Array<any>
    );
  }

  onCensChange(id_cens: any) {
    this.limpiarCursos();
    this.http.get(`${this.API_URL}/VerSedebyIdCens/${id_cens}`).subscribe(
      data => this.sedes = data as Array<any>
    );
  }

  verCursos() {
    this.http.get(`${this.API_URL}/CursosByIdSedeActivos/${this.selectedSede}`).subscribe(
      data => this.cursos = data as Array<any>
    );
  }

  limpiarCursos() {
    this.cursos = [];
  }
}
