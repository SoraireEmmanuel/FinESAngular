import { Component, OnInit } from '@angular/core';
import { CursoContenidoService } from 'src/app/services/curso-contenido.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/Auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  rol:any='0';
  usuario:any;
  password:any;


  constructor(public cursoContenidoService: CursoContenidoService, private _auth:AuthService,
    private router:Router) {

     }

  ngOnInit(): void {
     }
  estado(estado:string){
    this.cursoContenidoService.vista=estado;
    console.log(this.cursoContenidoService.vista,"vista:")
  }

identificarRol(){
 // this._auth.AuthLogin(this.usuario, this.password).subscribe(
 //   (res:any)=>{
 //     console.log(res);
 //     let respuesta:any
 //     if(respuesta!=null){
 //       this.rol=respuesta.rol;
 //     }
 //     else{
 //       this.rol=respuesta;
 //     }
 //   }
 // )

  if(this.usuario=='profesor' && this.password==1234){
    this.rol = 'profesor'
    this.router.navigate(['/docentehome'])
    return
  }
  if(this.usuario=='alumno'&& this.password==1234){
    this.rol = 'alumno'
    this.router.navigate(['/alumnohome'])
    return
  }
  if(this.usuario=='coordinador'&& this.password==1234){
    this.rol = 'coordinador'
    this.router.navigate(['/coordinadorhome'])
    return
  }

    this.rol = '0';
}

}
