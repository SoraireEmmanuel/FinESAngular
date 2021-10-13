export class Curso {
  Id_Curso?: number;
  turno: string;
  CicloLectivo: string;
  SedeNombre: string;
  MateriaNombre: string;
  IGE: string;
  Estado: boolean;
  MateriaCodigo: string;
  MateriaCargaHoraria: string;

  constructor() {
    this.Id_Curso = -1,
      this.turno = "",
      this.CicloLectivo = "",
      this.SedeNombre = "",
      this.MateriaNombre = "",
      this.IGE = "-1",
      this.Estado = true,
      this.MateriaCargaHoraria = "",
      this.MateriaCodigo = ""
  }

}
