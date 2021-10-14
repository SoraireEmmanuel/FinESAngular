export class Clases{
  Id_Clase?:number;
  Titulo: string;
  ClaseNumero: string;
  Fecha: Date;
  Contenido:string;


  constructor(){
    this.Id_Clase=-1;
    this.Titulo="";
    this.ClaseNumero="";
    this.Fecha=new Date();
    this.Contenido="";

  }
}
