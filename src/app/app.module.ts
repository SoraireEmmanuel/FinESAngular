import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';


import { RouterModule} from '@angular/router';
import { ROUTES } from './app.routes';

import { NavbarComponent } from './navbar/navbar/navbar.component';
import { HomeComponent } from './component/home/home.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlumnoHomeComponent } from './component/alumno-home/alumno-home.component';
import { DocenteHomeComponent } from './component/docente-home/docente-home.component';
import { CoordinadorHomeComponent } from './component/coordinador-home/coordinador-home.component';
import { TrayectoriaacademicaComponent } from './component/AlumnoHome/trayectoriaacademica/trayectoriaacademica/trayectoriaacademica.component';
import { InscripcionComponent } from './component/AlumnoHome/inscripcion/inscripcion/inscripcion.component';
import { ReclamoComponent } from './component/AlumnoHome/reclamo/reclamo/reclamo.component';
import { MisCursosActivosComponent } from './component/docente-home/MisCursosActivos/mis-cursos-activos/mis-cursos-activos.component';
import { MisCursosHistoricosComponent } from './component/docente-home/MisCursosHistorico/mis-cursos-historicos/mis-cursos-historicos.component';
import { AsignardocenteComponent } from './component/coordinador-home/asignardocente/asignardocente/asignardocente.component';
import { AdministrarcursoComponent } from './component/coordinador-home/administrarcurso/administrarcurso/administrarcurso.component';
import { CursoPresentismoNotaContenidoComponent } from './component/docente-home/cursoPresentismoNotaContenido/curso-presentismo-nota-contenido/curso-presentismo-nota-contenido.component';


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
    MisCursosHistoricosComponent,
    AsignardocenteComponent,
    AdministrarcursoComponent,
    CursoPresentismoNotaContenidoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot( ROUTES, {useHash:true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
