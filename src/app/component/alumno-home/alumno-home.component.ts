import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alumno-home',
  templateUrl: './alumno-home.component.html',
  styleUrls: ['./alumno-home.component.css']
})
export class AlumnoHomeComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit(): void {
  }
trayectoriaAcademica(){
  this._router.navigate(['/trayectoriaAcademica'])
}
reclamos(){
  this._router.navigate(['/reclamos'])
}
}
