import { Component, OnInit } from '@angular/core';
import { PdfMakeWrapper, Txt, Table } from 'pdfmake-wrapper';
import { ITable, ICustomTableLayout } from "pdfmake-wrapper/lib/interfaces";
import { CursoContenidoService } from 'src/app/services/curso-contenido.service';
// import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";
// pdfMake.vfs = pdfFonts.pdfMake.vfs;

interface DataResponseAsistenciaNotas {
  id: number,
  nya: string,
  claseId: number,
  presente: boolean
}
type TableRowAsistenciaNotas = [number, string, number, boolean];

interface DataResponseClaseContenido {
  Fecha: string,
  Titulo: string,
  Contenido: string
}

type TableRowClaseContenido = [string, string, string]

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  constructor(public cursoContenidoService: CursoContenidoService,) { }

  ngOnInit(): void {
  }
  async generatePDF() {

    const pdf = new PdfMakeWrapper;
    const dataAsistencias = await this.fetchData();
    const dataClaseContenido = await this.fetchData2();
    pdf.pageSize('A4');
    pdf.pageOrientation('landscape');

    pdf.add(
      new Txt("Materia: Matematica 1").bold().italics().end
    )
    pdf.add(
      new Txt("Curso Ige: 8934").bold().italics().end
    )
    pdf.add(
      new Txt("Carga Horaria: 5 horas semanales.").bold().italics().end
    )
    pdf.add(
      new Txt("Ciclo lectivo: 2021").bold().italics().end
    )
    pdf.add(
      new Txt("Sede: Cent. Cul. Maria").bold().italics().end
    )
    //console.log(dataAsistencias);
    console.log(dataClaseContenido);

    pdf.add(
      pdf.ln(2)
    );
    pdf.add(this.createTableAsistenciaNotas(dataAsistencias));

    pdf.add(
      pdf.ln(2)
    );

    pdf.add(this.createClaseContenido(dataClaseContenido)); //cambiar por dataContenidoClases


    //var win = window.open('', '_blank');
    pdf.create().open()

  }


  async fetchData(): Promise<DataResponseAsistenciaNotas[]> {
    return fetch('https://fines-back.herokuapp.com/asistencia?igeId=2020')
      .then(response => response.json())
      .then(data => data.filter((_: any, index: number) => index < 5))

  }
  createTableAsistenciaNotas(dataAsistencias: DataResponseAsistenciaNotas[]): ITable {
    return new Table([
      ["id", "nombre y apellido", "CLASE 1", "CLASE 2", "CLASE 3", "CLASE 4", "CLASE 5", "CLASE 6", "CLASE 7", "CLASE 8", "CLASE 8", "CLASE 10", "CLASE 11", "CLASE 12", "CLASE 13", "CLASE 14", "CLASE 15", "CLASE 16", "CLASE 17", "CLASE 18", "CLASE 19", "CLASE 20", "Nota 1", "Nota 2", "Nota Final"],
      [1, "Carmen Olivaris", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "A", "A", "A", "A", 5, 5, 5],
      [2, "Fernando Fernandez", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "A", "A", "A", "A", 3, 10, 6],
      [3, "gustavo cargneluti", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "A", "A", "A", "A", 0, 8, 6],
      [4, "Pedro Gonzalez", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "A", "A", "A", "A", 10, 10, 10],
      [5, "Esteban Gonzalez", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "A", "A", "A", "A", 10, 10, 10],
      [6, "Emma Ruiz", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "A", "A", "A", "A", 4, 8, 7],
      [7, "Emma Coco", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "A", "A", "A", "A", 7, 7, 7],
      [8, "Lucas Pastor", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "A", "A", "A", "A", 10, 10, 10],
      [9, "Roberto Pastor", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "A", "A", "A", "A", 10, 10, 10],
      [10, "October Fest", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "A", "A", "A", "A", 9, 9, 9],
      [11, "	Lucas Jose", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "A", "A", "A", "A", 10, 10, 10],
      [12, "Anto Lopez", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "A", "A", "A", "A", 8, 8, 8],
      [13, "Pato Lopez", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "A", "A", "A", "A", 5, 6, 5],
      [14, "Bautista Antares", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "A", "A", "A", "A", 10, 10, 10],
      [15, "Bautista Lopez", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "A", "A", "A", "A", 7, 10, 8],
      //...this.extractDataAsistencia(dataAsistencias)

    ])
      .widths([10, 200, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 40, 40, 60])
      .heights(rowIndex => {
        return rowIndex === 0 ? 40 : 0;
      })
      .alignment('center')

      .layout({
        fillColor: (rowIndex?: number, node?: any, columnIndex?: number) => {

          return rowIndex === 0 ? "#FFDE33" : "";
        }
      })

      .end;
  }

  //se llama desde la creacion de la tabla AsistenciaNotas
  extractDataAsistencia(asistencia: DataResponseAsistenciaNotas[]): TableRowAsistenciaNotas[] {
    return asistencia.map(row => [row.id, row.nya, row.claseId, row.presente])

  }
  async fetchData2(): Promise<DataResponseClaseContenido[]> { //this.cursoContenidoService.listClases;
    return this.cursoContenidoService.listClases
    // fetch('https://fines-back.herokuapp.com/clases?igeId=2020')
    //   .then(response => response.json())
    //   .then(data => data.filter((_: any, index: number) => index < 5))

  }
  createClaseContenido(dataClaseContenido: DataResponseClaseContenido[]): ITable { //cambiar la interfaz y la variable q recibe
    return new Table([
      ["Fecha", "Clase", "Tema"],
      // ["15/9/2021", "Clase 1", "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veli"],
      // ["15/9/2021", "Clase 1", "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veli"],
      // ["15/9/2021", "Clase 1", "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veli"],
      // ["15/9/2021", "Clase 1", "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veli"],
      // ["15/9/2021", "Clase 1", "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veli"],
      // ["15/9/2021", "Clase 1", "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veli"],
      // ["15/9/2021", "Clase 1", "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veli"],
      // ["15/9/2021", "Clase 1", "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veli"],
      // ["15/9/2021", "Clase 1", "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veli"],
      // ["15/9/2021", "Clase 1", "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veli"],
      // ["15/9/2021", "Clase 1", "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veli"],
      // ["15/9/2021", "Clase 1", "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veli"],
      //
      ...this.extractDataClaseContenido(dataClaseContenido)

    ])
      .widths([80, 200, '*'])
      .heights((rowIndex: any) => {
        return rowIndex === 0 ? 20 : 0;
      })
      .alignment('center')

      .layout({
        fillColor: (rowIndex?: number, node?: any, columnIndex?: number) => {

          return rowIndex === 0 ? "#B0FF33" : "";
        }
      })

      .end;
  }

  //se llama desde la creacion de la tabla ClaseContenido
  extractDataClaseContenido(claseContenido: DataResponseClaseContenido[]): TableRowClaseContenido[] {
    return claseContenido.map(row => [row.Fecha, row.Titulo, row.Contenido])

  }
}

