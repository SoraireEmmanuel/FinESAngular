import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';


import { RouterModule} from '@angular/router';
import { ROUTES } from './app.routes';

import { NavbarComponent } from './navbar/navbar/navbar.component';
import { HomeComponent } from './component/home/home.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { ToastrModule } from 'ngx-toastr';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlumnoHomeComponent } from './component/alumno-home/alumno-home.component';
import { DocenteHomeComponent } from './component/docente-home/docente-home.component';
import { CoordinadorHomeComponent } from './component/coordinador-home/coordinador-home.component';
import { TrayectoriaacademicaComponent } from './component/AlumnoHome/trayectoriaacademica/trayectoriaacademica/trayectoriaacademica.component';
import { InscripcionComponent } from './component/AlumnoHome/inscripcion/inscripcion/inscripcion.component';
import { ReclamoComponent } from './component/AlumnoHome/reclamo/reclamo/reclamo.component';
import { MisCursosActivosComponent } from './component/docente-home/MisCursosActivos/mis-cursos-activos/mis-cursos-activos.component';

import { CursoPresentismoNotaContenidoComponent } from './component/docente-home/cursoPresentismoNotaContenido/curso-presentismo-nota-contenido/curso-presentismo-nota-contenido.component';
import { UserComponent } from './component/user/user.component';
import { VerMateriaComponent } from './component/AlumnoHome/VerMateria/ver-materia/ver-materia.component'
import { ReporteComponent } from './component/docente-home/cursoPresentismoNotaContenido/reporte/reporte.component'
import { AdministrarCursosComponent } from './component/coordinador-home/administrar-cursos/administrar-cursos.component'
import { DetalleCursoComponent } from './component/coordinador-home/detalle-curso/detalle-curso.component';
import { CrearCursoComponent } from './component/coordinador-home/crear-curso/crear-curso.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SidebarComponent,
    AlumnoHomeComponent,
    DocenteHomeComponent,
    CoordinadorHomeComponent,
    TrayectoriaacademicaComponent,
    InscripcionComponent,
    ReclamoComponent,
    MisCursosActivosComponent,
    VerMateriaComponent,
    CursoPresentismoNotaContenidoComponent,
    UserComponent,
    ReporteComponent,
    AdministrarCursosComponent,
    DetalleCursoComponent,
    CrearCursoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot( ROUTES, {useHash:true}),
    HttpClientModule,
    ToastrModule.forRoot(),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
