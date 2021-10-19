import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'
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
    private toast: ToastrService,
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
        data =>
        Swal.fire({
          icon: 'success',
          title: 'Creado!',
          text: 'Curso creado satisfactoriamente',

        }),
        // this.toast.success('Curso creado satisfactoriamente', 'Curso'),
        error => this.toast.error('Error en la creacion del curso', 'Curso'),
    );

    this.cursoForm.reset({ estado: true });
  }
}
