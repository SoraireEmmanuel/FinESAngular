import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detalle-curso',
  templateUrl: './detalle-curso.component.html',
  styleUrls: ['./detalle-curso.component.css']
})
export class DetalleCursoComponent implements OnInit {
  @Input() curso!: any;

  API_URL = 'https://apifines.azurewebsites.net/api';

  campoDni: number;
  docente: any;
  docenteExiste: boolean = false;
  apellidoNombreDocente: string;
  dniDocente: any;

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    if (this.curso['DocenteId'] != -1) {
      this.http.get(`${this.API_URL}/Usuarios/${this.curso['DocenteId']}`).subscribe(
        data => {
          let docente = data as any;
          this.apellidoNombreDocente = `${docente['Apellido']}, ${docente['Nombre']}`;
          this.dniDocente = docente['DNI'];
        }
      )
    }
  }

  buscarDocente(dni: number) {
    this.docente = null;
    this.http.get(`${this.API_URL}/BuscarDocenteByDNI?dni=${dni}`).subscribe(
      data => {
        if ((data as any[]).length > 0) {
          this.docenteExiste = true;
          this.docente = (data as any[])[0];
        } else {
          this.docenteExiste = false;
        }        
      },
      error => this.docenteExiste = false
    );
  }

  asignarDocente() {
    this.http.post(
      `${this.API_URL}/AsignarDocente`,
      {
        "Id_Docente": this.docente['IdDocente'],
        "Id_Curso": this.curso['Id_Curso']
      }
    ).subscribe(
      ok => {
        this.curso['DocenteId'] = this.docente['IdDocente'];
        this.apellidoNombreDocente = `${this.docente['Apellido']}, ${this.docente['Nombre']}`;
        this.dniDocente = this.docente['DNI'];
      }
    );
  }
}
