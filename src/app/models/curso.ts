import { Clases } from "./clases";

export class Curso{
  id?:number;
  turno:string;
  cicloLectivo:string;
  sede: string;
  clases: Clases
}
