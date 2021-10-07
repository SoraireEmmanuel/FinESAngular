import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-administrar-cursos',
  templateUrl: './administrar-cursos.component.html',
  styleUrls: ['./administrar-cursos.component.css']
})
export class AdministrarCursosComponent implements OnInit {
  materias: any;
  cens: any;
  sedes: any;
  selectedItem: any;

  cursoForm = this.formBuilder.group({
    IGE: '',
    Anio: '',
    Id_Cens: '',
    Id_Materia: '',
    Id_Sede: '',
  });

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.http.get("https://apifines.azurewebsites.net/api/VerListaMaterias").subscribe(
      data => this.materias = data as Array<any>
    );

    this.http.get("https://apifines.azurewebsites.net/api/VerCENS").subscribe(
      data => this.cens = data as Array<any>
    );

    this.cursoForm.controls['Id_Cens'].valueChanges.subscribe(data => {
      this.onCensChange(data);
    });
  }

  onCensChange(id_cens: any) {
    this.http.get(`https://apifines.azurewebsites.net/api/VerSedebyIdCens/${id_cens}`).subscribe(
      data => this.sedes = data as Array<any>
    );
  }

  onSubmitCurso() {
    this.http.post('https://apifines.azurewebsites.net/api/AdministrarCursos', this.cursoForm.value)
      .subscribe(
        data => console.log(data)
      );

    this.cursoForm.reset();
  }
}
