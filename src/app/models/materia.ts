export class Materia{
  id?:number;
  nombre:string;
  nivel:string;
  cuatrimestre:string;
  cargaHoraria: string;
  igeCurso: number

  constructor(){
    this.id= 0,
    this.nombre= "",
    this.nivel= "",
    this.cuatrimestre= "",
    this.cargaHoraria= "",
    this.igeCurso= 0
  }
}
