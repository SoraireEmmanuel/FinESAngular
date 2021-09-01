export class Curso {
  id?: number;
  turno: string;
  cicloLectivo: string;
  sedeId: string;
  materia: string;
  ige: number;
  estado: string;

  constructor() {
    this.id = -1,
      this.turno = "",
      this.cicloLectivo = "",
      this.sedeId = "",
      this.materia = "",
      this.ige = -1,
      this.estado = "activo"
  }

}
