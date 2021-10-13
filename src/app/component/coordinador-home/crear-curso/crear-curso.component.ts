import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-crear-curso',
  templateUrl: './crear-curso.component.html',
  styleUrls: ['./crear-curso.component.css']
})
export class CrearCursoComponent implements OnInit {
  API_URL = "https://apifines.azurewebsites.net/api";

  cursoForm = this.formBuilder.group({
    IGE: '',
    Anio: '',
    Id_Cens: '',
    Id_Materia: '',
    Id_Sede: '',
    estado: true,
    diaHorario: ''
  });
  
  materias: any[];
  cens: any[];
  sedes: any[];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
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

  onSubmitCurso() {
    this.http.post(`${this.API_URL}/AdministrarCursos`, this.cursoForm.value)
      .subscribe(
        data => console.log(data)
      );

    this.cursoForm.reset({ estado: true });
  }
}
