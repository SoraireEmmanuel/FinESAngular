import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TrayectoriaAcademicaService } from 'src/app/services/trayectoriaAcademica/trayectoria-academica.service';


@Component({
  selector: 'app-ver-materia',
  templateUrl: './ver-materia.component.html',
  styleUrls: ['./ver-materia.component.css']
})
export class VerMateriaComponent implements OnInit {
id:any;
idMateria:any=9999;
materiaData:any;
  constructor(private router:Router,
              private _ac:ActivatedRoute,
              private _trayectoria:TrayectoriaAcademicaService) {
this._ac.paramMap.subscribe(param=>{
  this.id=param.get('id');
  _trayectoria.verMateria(this.id).subscribe(resp=>{
    this.materiaData=resp;
    this.idMateria=this.materiaData[0].Id_Materia
  })
})
               }

  ngOnInit(): void {
  }
volver(){
this.router.navigate(['/trayectoriaAcademica'])
}
inscribirme(){

this.router.navigate(['/inscripcion',this.idMateria])
}
}
