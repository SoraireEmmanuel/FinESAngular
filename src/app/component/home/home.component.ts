import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  finesImg = 'https://web.catamarca.edu.ar/sitio/images/2021/Plan-Fines-2021.jpg'//'https://www.todoprovincial.com/wp-content/uploads/2018/09/fines.png'

  constructor() { }

  ngOnInit(): void {
  }
  prueba() {

  }

}
