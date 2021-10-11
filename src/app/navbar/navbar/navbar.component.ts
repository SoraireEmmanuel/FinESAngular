import { Component, OnInit } from '@angular/core';
import { CursoContenidoService } from 'src/app/services/curso-contenido.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { ViewChild, ElementRef} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NuevaCuentaService } from 'src/app/services/nuevaCuenta/nueva-cuenta.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  rol:any='0';
  usuario:any;
  password:any;
  status:boolean=true
  
  //variables del formulario registrar usuario
  nombre:string='';
  apellido:string='';
  dni:string='';
  mail:string='';
  password1:string='';
  password2:string='';
  telefono:string='';
  tipousuario:string='1';

  @ViewChild('cerrarmodal') cerrarmodal: ElementRef;

  constructor(public cursoContenidoService: CursoContenidoService, private _auth:AuthService,
    private router:Router, private toastr: ToastrService, private _nuevaCuenta: NuevaCuentaService) {

     }

  ngOnInit(): void {
     }
  estado(estado:string){
    this.cursoContenidoService.vista=estado;
    console.log(this.cursoContenidoService.vista,"vista:")
  }

identificarRol(){
 this._auth.AuthLogin(this.usuario,this.password).subscribe(resp=>{
   console.log(resp);
   var us:any=resp;
   this.rol=us.rol;
 },error=>{console.log(error)})
}


crearCuenta(){
  if(this.nombre=='' || this.apellido=='' || this.dni==''
  || this.mail=='' || this.telefono=='' ){
    this.toastr.error('Todos los campos son obligatorios','ERROR');
    return;
  }
  else{
    if(this.password1 != this.password2){
      this.toastr.error('Las contraseñas no coinciden','ERROR')
      return;
    }
  }
  this._nuevaCuenta.nuevaCuenta(this.nombre, this.apellido, this.dni, this.mail, this.password,
    this.telefono, this.tipousuario).subscribe(resp=>{
      this.toastr.success('La cuenta fue creada exitosamente','CREACION EXITOSA');
      this.cerrarmodal.nativeElement.click();
    },
    error=>{
      console.log(error);
      this.toastr.error('Problemas con el servidor. La cuenta no pudo ser creada exitosamente', 'ERROR')

    })
  
}
cerrarsesion(){
  this.status=true;
  this.rol='0';
  this.router.navigate(['/home']);
  this.password = '';
  this.usuario = '';
}
}
