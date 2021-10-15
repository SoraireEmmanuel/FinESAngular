import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TrayectoriaAcademicaService } from 'src/app/services/trayectoriaAcademica/trayectoria-academica.service';
import { TrayectoriaacademicaComponent } from '../../trayectoriaacademica/trayectoriaacademica/trayectoriaacademica.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.css']
})
export class InscripcionComponent implements OnInit {
  selectLocalidad: any;
  sededisabled = true;
  sedeobject: any;
  selectSede={
    "Id_Curso": "",
    "DiayHorario": "",
    "SedeNombre": "",
    "SedeDireccion": "",
    "Cens": ""
  }
  inscribirmeDisabled =true;
  id: any;
  materiadata: any;
  localidades: any;
  constructor(private _ac: ActivatedRoute, private router:Router,
    private _trayectoria: TrayectoriaAcademicaService,
    private _toastr: ToastrService) {
    this._ac.paramMap.subscribe(param => {
      this.id = param.get('id');
    })
    this._trayectoria.datoMateria(this.id).subscribe(
      res => {
        this.materiadata = res;
      }
    )
    this._trayectoria.localidades(this.id).subscribe(
      res => {
        this.localidades = res
      }
    )
    console.log(this.id);
    document.getElementById('sede')
  }

  ngOnInit(): void {
  }

  seleccionLocalidad(localidad: any) {
    console.log(localidad)
    this.selectLocalidad = localidad
    this.sededisabled = false
    this._trayectoria.sedes(this.id, localidad).subscribe(resp => {
      this.sedeobject = resp;
    },
      error => {
        console.log(error)
      }
    )
  }
  seleccionarSede(item: any) {
    console.log(item)
    let select = {
      "Id_Curso": "",
      "DiayHorario": "",
      "SedeNombre": "",
      "SedeDireccion": "",
      "Cens": ""
    }
    for (var i of this.sedeobject) {
      if (i.Id_Curso == item) {
        select.Id_Curso = i.Id_Curso
        select.SedeDireccion = i.SedeDireccion
        select.SedeNombre = i.SedeNombre
        select.DiayHorario = i.DiayHorario
        select.Cens = i.Cens
      }
    }
    console.log(select)
    this.selectSede=select;
    this.inscribirmeDisabled=false;
  }
  inscribirme(){
    var idalumno = localStorage.getItem('idUsuario')
    this._trayectoria.inscribirme(this.selectSede.Id_Curso,idalumno).subscribe(resp=>{
      this._toastr.success('La Inscripcion fue exitosa','INSCRIPCION EXITOSA')
      this.router.navigate(['/trayectoriaAcademica'])
    },
    error=>{
    this._toastr.error('Algo salio mal, intente de nuevo mas tarde','INSCRIPCION FALLIDA')
    })

  }
}
