import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get("https://apifines.azurewebsites.net/api/VerListaMaterias").subscribe(
      data => this.materias = data as Array<any>
    );

    this.http.get("https://apifines.azurewebsites.net/api/VerCENS").subscribe(
      data => this.cens = data as Array<any>
    );
  }

  onCensChange(id_cens: any) {
    this.http.get(`https://apifines.azurewebsites.net/api/VerSedebyIdCens/${id_cens}`).subscribe(
      data => this.sedes = data as Array<any>
    );
  }
}
