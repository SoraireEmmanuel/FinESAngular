export class Asistencia {
  id?: number;
  present: boolean;
  igeId: number;
  nota1: number;
  nota2: number;
  notaFinal: number;
  claseId: number

  constructor() {
    this.id = -1,
      this.present = false,
      this.igeId = -1,
      this.nota1 = -1,
      this.nota2 = -1,
      this.notaFinal = -1,
      this.claseId = -1
  }
}
