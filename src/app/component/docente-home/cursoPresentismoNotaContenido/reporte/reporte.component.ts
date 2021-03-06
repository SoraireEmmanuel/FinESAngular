import { Component, OnInit } from '@angular/core';
import { PdfMakeWrapper, Txt, Table, Img } from 'pdfmake-wrapper';
import { ITable, ICustomTableLayout } from "pdfmake-wrapper/lib/interfaces";
import { CursoContenidoService } from 'src/app/services/curso-contenido.service';
import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
// import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";
// pdfMake.vfs = pdfFonts.pdfMake.vfs;

interface DataResponseAsistenciaNotas {
  id: number,
  nya: string,
  claseId: number,
  presente: boolean
}
type TableRowAsistenciaNotas = [number, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, number, number, number];

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
  table = [["Id", "Nombre y Apellido", "CLASE 1", "CLASE 2", "CLASE 3", "CLASE 4", "CLASE 5", "CLASE 6", "CLASE 7", "CLASE 8", "CLASE 8", "CLASE 10", "CLASE 11", "CLASE 12", "CLASE 13", "CLASE 14", "CLASE 15", "CLASE 16", "CLASE 17", "CLASE 18", "CLASE 19", "CLASE 20", "Nota 1", "Nota 2", "Nota Final"],
  ] as any;
  curso: any;
  materia: any;
  apellidoNombreDocente: any;
  dniDocente: any;
  loading = false;
  newAPI = 'https://apifines.azurewebsites.net/api/';

  constructor(public cursoContenidoService: CursoContenidoService, private http: HttpClient,) { }

  ngOnInit(): void {
  }
  async generatePDF() {


    const pdf = new PdfMakeWrapper;
    const dataAsistencias = await this.fetchData();
    const dataClaseContenido = await this.fetchData2();
    pdf.pageSize('A4');
    pdf.pageOrientation('landscape');
    // pdf.pageMargins([ 40, 60, 40, 60 ]);

    pdf.header(`** PLAN FINES ** | Reporte del curso | IGE: ${this.curso.IGE} | Sede:  ${this.curso.SedeNombre} - Ciclo lectivo:  ${this.curso.CicloLectivo}`);

    pdf.watermark(new Txt('USO OFICIAL ').color('#F8F5F5').end);

    pdf.add(
      new Txt(`Materia `).bold().italics().bold().fontSize(10).end

    )
    pdf.add(
      new Txt(`${this.materia.MateriaNombre}`).fontSize(10).end

    )



    pdf.add(
      new Txt(`Carga Horaria`).bold().italics().fontSize(10).end
    )
    pdf.add(
      new Txt(`${this.materia.CargaHoraria} horas semanales`).fontSize(10).end
    )
    pdf.add(
      new Txt(`Profesor`).bold().italics().bold().fontSize(10).end
    )
    pdf.add(
      new Txt(`${this.dniDocente} - ${this.apellidoNombreDocente}`).fontSize(10).end
    )

    //console.log(dataClaseContenido);

    pdf.add(
      pdf.ln(2)
    );
    // console.log("tabla usada para el reporte", this.table)
    pdf.add(this.createTableAsistenciaNotas(this.table));//dataAsistencias

    pdf.add(
      pdf.ln(2)
    );

    pdf.add(this.createClaseContenido(dataClaseContenido)); //cambiar por dataContenidoClases


    //var win = window.open('', '_blank');
    pdf.create().open()
    this.loading = false;
  }


  async fetchData(): Promise<DataResponseAsistenciaNotas[]> {
    return fetch('https://fines-back.herokuapp.com/asistencia?igeId=2020')
      .then(response => response.json())
      .then(data => data.filter((_: any, index: number) => index < 5))

  }
  cargarheather() {
    this.cursoContenidoService.obtenerCurso1(localStorage.getItem('idCurso')).subscribe((res: any) => {
      this.curso = res[0] as any;
    });

    this.cursoContenidoService.obtenerMateria1(localStorage.getItem('idCurso')).subscribe(
      (da: any) => {
        this.materia = da[0] as any;
        ;

      })
    var idDocente: any = -1;
    idDocente = localStorage.getItem('idUsuario')
    this.http.get(`${this.newAPI}/Usuarios/${idDocente}`).subscribe(
      data => {
        let docente = data as any;
        this.apellidoNombreDocente = `${docente['Apellido']}, ${docente['Nombre']}`;
        this.dniDocente = docente['DNI'];
      }
    )
  }
  createTableAsistenciaNotas(dataAsistencias: any): ITable { //DataResponseAsistenciaNotas[]): ITable {
    return new Table([
      // ["id", "nombre y apellido", "CLASE 1", "CLASE 2", "CLASE 3", "CLASE 4", "CLASE 5", "CLASE 6", "CLASE 7", "CLASE 8", "CLASE 8", "CLASE 10", "CLASE 11", "CLASE 12", "CLASE 13", "CLASE 14", "CLASE 15", "CLASE 16", "CLASE 17", "CLASE 18", "CLASE 19", "CLASE 20", "Nota 1", "Nota 2", "Nota Final"],
      // [1, "Carmen Olivaris", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "A", "A", "A", "A", 5, 5, 5],
      // [2, "Fernando Fernandez", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "A", "A", "A", "A", 3, 10, 6],
      // [3, "gustavo cargneluti", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "A", "A", "A", "A", 0, 8, 6],
      // [4, "Pedro Gonzalez", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "A", "A", "A", "A", 10, 10, 10],
      // [5, "Esteban Gonzalez", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "A", "A", "A", "A", 10, 10, 10],
      // [6, "Emma Ruiz", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "A", "A", "A", "A", 4, 8, 7],
      // [7, "Emma Coco", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "A", "A", "A", "A", 7, 7, 7],
      // [8, "Lucas Pastor", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "A", "A", "A", "A", 10, 10, 10],
      // [9, "Roberto Pastor", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "A", "A", "A", "A", 10, 10, 10],
      // [10, "October Fest", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "A", "A", "A", "A", 9, 9, 9],
      // [11, "	Lucas Jose", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "A", "A", "A", "A", 10, 10, 10],
      // [12, "Anto Lopez", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "A", "A", "A", "A", 8, 8, 8],
      // [13, "Pato Lopez", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "A", "A", "A", "A", 5, 6, 5],
      // [14, "Bautista Antares", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "A", "A", "A", "A", 10, 10, 10],
      // [15, "Bautista Lopez", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "A", "A", "A", "A", 7, 10, 8],
      ...(dataAsistencias)

    ])
      .widths([10, 200, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 40, 40, 60])
      .heights(rowIndex => {
        return rowIndex === 0 ? 40 : 0;
      })
      .alignment('center')

      .layout({
        fillColor: (rowIndex?: number, node?: any, columnIndex?: number) => {

          return rowIndex === 0 ? "#3EE4FC" : "";
        }
      })

      .end;
  }

  createtablaauxNota() {

    this.http.get(`${this.newAPI}NotasByCursoId/${localStorage.getItem('idCurso')}`).toPromise()
      .then((data: any) => {
        var notas = data as any;
        // console.log("notas", notas)
        ;

        for (let inx = 0; inx < data.length; inx++) { //asist.length reemplazo 3

          var notas6 = "('" + data[inx].Nota1 + "','" + data[inx].Nota2 + "','" + data[inx].NotaFinal + "')"
          //  console.log("data.notas6", notas6,)


          this.table[inx + 1].push(data[inx].Nota1)
          this.table[inx + 1].push(data[inx].Nota2)
          this.table[inx + 1].push(data[inx].NotaFinal)

          //   console.log("for tabla ", this.table)
        }
      })

    this.generatePDF()
  }
  createtableaux1() {
    this.loading = true;
   
    this.cargarheather();
    var idClase = this.cursoContenidoService.listClases[1].Id_Clase;
    this.http.get(`${this.newAPI}TodasLasAsistenciasDeUnaClase/${idClase}`).toPromise()
      .then((dat: any) => {
        for (let ind = 0; ind < dat.length; ind++) { //dat.length reemplazo 3
          var nya: any = dat[ind].NombreAlumno + " " + dat[ind].ApellidoAlumno;
          this.table.push([ind + 1])
          this.table[ind + 1].push(nya)
          //  console.log(this.table[ind])
        }
        //  console.log("aux1 tabla ", this.table)
        this.createTableAux()
      }
      )
  }
  createTableAux() {


    var idsClases = this.cursoContenidoService.listClases;
    // console.log("idsClases", idsClases);
    var clases = idsClases.map((row: any,) => row.Id_Clase);
    //  console.log("clases filtradas", clases, "  total de clases", clases.length); //tengo todos los ids de clases


    var tablaAux: any = []
    var asistio: any;

    for (let index = 0; index < clases.length; index++) { //clases.length reemplazo 3
      //  console.log("clases.index=", clases[index])

      this.http.get(`${this.newAPI}TodasLasAsistenciasDeUnaClase/${clases[index]}`).toPromise()
        .then(
          (dat: any) => {
            // this.asist = dat as Asistencia;
            // console.log("obtener asis report", dat)
            ;


            for (let index1 = 0; index1 < dat.length; index1++) { //asist.length reemplazo 3
              //const element = array[index];
              //   console.log("dat.asistio", dat[index1].Asistio

              //     "tabla  en la posicion", this.table[index1], "index1", index1
              //  )
              if (dat[index1].Asistio == true) {
                asistio = "P";
                //   console.log("if", "P", asistio);
              }
              if (dat[index1].Asistio == false) {
                asistio = "A";
                //   console.log("if2", "A", asistio);
              }

              this.table[index1 + 1].push(asistio)
              //table[index1+1]=[(table[index1+1]+","+"'"+asistio+"'")]//(table[index1+1],dat[index1].Asistio)


              // tablaAux[index1].push(dat[index1].Asistio)
              // console.log("for tabla ", this.table)
            }
          });


    }


    setTimeout(() => {
      this.createtablaauxNota()
      // console.log("inside timeout");
    }, 3000);
    //this.createtablaauxNota()
  }

  //se llama desde la creacion de la tabla AsistenciaNotas
  // extractDataAsistencia(asistencia: DataResponseAsistenciaNotas[]): TableRowAsistenciaNotas[] {
  //   return asistencia.map(row => [row.id, row.nya, row.claseId, row.presente])

  // }
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

          return rowIndex === 0 ? "#3EE4FC" : "";
        }
      })

      .end;
  }

  //se llama desde la creacion de la tabla ClaseContenido
  extractDataClaseContenido(claseContenido: DataResponseClaseContenido[]): TableRowClaseContenido[] {
    return claseContenido.map(row => [row.Fecha, row.Titulo, row.Contenido])

  }
}

