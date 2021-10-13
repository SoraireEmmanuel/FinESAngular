import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DetalleCursoComponent } from '../detalle-curso/detalle-curso.component';

@Component({
  selector: 'app-administrar-cursos',
  templateUrl: './administrar-cursos.component.html',
  styleUrls: ['./administrar-cursos.component.css'],
  providers: [DetalleCursoComponent]
})
export class AdministrarCursosComponent implements OnInit {
  API_URL = "https://apifines.azurewebsites.net/api";

  materias: any;
  cens: any;
  sedes: any;
  selectedCens: any;
  selectedSede: any;
  cursos: any;

  cursoForm = this.formBuilder.group({
    IGE: '',
    Anio: '',
    Id_Cens: '',
    Id_Materia: '',
    Id_Sede: '',
    estado: true,
    diaHorario: ''
  });

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.http.get(`${this.API_URL}/VerListaMaterias`).subscribe(
      data => this.materias = data as Array<any>
    );

    this.http.get(`${this.API_URL}/VerCens`).subscribe(
      data => this.cens = data as Array<any>
    );

    this.cursoForm.controls['Id_Cens'].valueChanges.subscribe(data => {
      this.onCensChange(data);
    });
  }

  onCensChange(id_cens: any) {
    this.http.get(`${this.API_URL}/VerSedebyIdCens/${id_cens}`).subscribe(
      data => this.sedes = data as Array<any>
    );
  }

  verCursos() {
    this.http.get(`${this.API_URL}/CursosByIdSedeActivos/${this.selectedSede}`).subscribe(
      data => this.cursos = data as Array<any>
    );
  }

  onSubmitCurso() {
    this.http.post(`${this.API_URL}/AdministrarCursos`, this.cursoForm.value)
      .subscribe(
        data => console.log(data)
      );

    this.cursoForm.reset({ estado: true });
  }
}
