import { Routes} from '@angular/router'

import { AlumnoHomeComponent } from './component/alumno-home/alumno-home.component';
import { InscripcionComponent } from './component/AlumnoHome/inscripcion/inscripcion/inscripcion.component';
import { ReclamoComponent } from './component/AlumnoHome/reclamo/reclamo/reclamo.component';
import { TrayectoriaacademicaComponent } from './component/AlumnoHome/trayectoriaacademica/trayectoriaacademica/trayectoriaacademica.component';
import { VerMateriaComponent } from './component/AlumnoHome/VerMateria/ver-materia/ver-materia.component';
import { CoordinadorHomeComponent } from './component/coordinador-home/coordinador-home.component';
import { CursoPresentismoNotaContenidoComponent } from './component/docente-home/cursoPresentismoNotaContenido/curso-presentismo-nota-contenido/curso-presentismo-nota-contenido.component';
import { DocenteHomeComponent } from './component/docente-home/docente-home.component';
import { MisCursosActivosComponent } from './component/docente-home/MisCursosActivos/mis-cursos-activos/mis-cursos-activos.component';
import { HomeComponent } from './component/home/home.component';
import { AdministrarCursosComponent } from './component/coordinador-home/administrar-cursos/administrar-cursos.component';


export const ROUTES:Routes=[
    { path: 'home', component: HomeComponent },
    { path: 'alumnohome', component: AlumnoHomeComponent },
    { path: 'docentehome', component: DocenteHomeComponent },
    { path: 'coordinadorhome', component: CoordinadorHomeComponent },
    { path: 'trayectoriaAcademica', component: TrayectoriaacademicaComponent },
    { path: 'vermateria/:id', component: VerMateriaComponent },
    { path: 'reclamos', component: ReclamoComponent },
    { path: 'inscripcion/:id', component: InscripcionComponent },
    { path: 'alumnoreclamo', component: ReclamoComponent },
    { path: 'miscursos', component: MisCursosActivosComponent },
    { path: 'cursopresentismocontenido', component: CursoPresentismoNotaContenidoComponent },
    { path: 'administrarcursos', component: AdministrarCursosComponent },
    { path: '', pathMatch: 'full', redirectTo: 'home'},
    { path: '**', pathMatch: 'full', redirectTo: 'home'}
];
