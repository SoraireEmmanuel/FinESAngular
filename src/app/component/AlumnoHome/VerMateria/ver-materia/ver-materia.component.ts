import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ver-materia',
  templateUrl: './ver-materia.component.html',
  styleUrls: ['./ver-materia.component.css']
})
export class VerMateriaComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
volver(){
this.router.navigate(['/trayectoriaAcademica'])
}
}
