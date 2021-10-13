import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle-curso',
  templateUrl: './detalle-curso.component.html',
  styleUrls: ['./detalle-curso.component.css']
})
export class DetalleCursoComponent implements OnInit {
  @Input() curso!: any;

  constructor() { }

  ngOnInit(): void {
  }

}
