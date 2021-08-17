import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuView: boolean = true;
  usuario: string = '';
  password: string = '';
  constructor() { }

  ngOnInit(): void {
  }

  login() {

    //validar el login con el servicio y dependiendo de lo que retorne el servidor encender el toast y cammbiar el estado del menuView, sea cual sea el resultado blanquear las variables
    if (this.usuario != '') {
     
      this.usuario='';
      this.password='';
      this.menuView=false;
      
    }
    else {
      
      this.usuario='';
      this.password='';
    }
  }
  logout() {
    //    this.menuView=true;
    //   this.router.navigate(['home']);
    // borrar el token y cambiar el estado del menu
  }
}
