import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-metodos',
  templateUrl: './metodos.component.html',
  styleUrls: ['./metodos.component.css']
})
export class MetodosComponent implements OnInit {

  //Cabecera necesarias
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'text/plain'
    })
  };

  // Resultados
  jsonTs: any;
  jsonDatosM: any;
  jsonTitulos: any;
  jsonMon: any;
  jsonForma: any;
  respuesta: any;

  visibleMoneda = false;
  visibleTs = false;
  visibleDatosM = false;
  visibleForma = false;

  // Parametros
  paramGen = {
    Json: true,
    param: {
      Tabla: "",
      Bdtxt: "B",
      Filtro: ""
    }
  }
  paramXXX = {
    Json: true,
    param: {
      Codigo: "",
      Tpcodigo: ""
    }
  }

  viejucoJson = {
    Json: true,
    agencia: 0,
    ejecutivo: 0,
    stat: 0,
    desde: "2019001",
    moneda: 0,
    hasta: "2020193",
    busqueda: ""
  }


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    let arreglo = [1,2,3,4]
    console.table(arreglo);
    console.table(this.viejucoJson);
  }

  consultaViejo(){
    let obs = this.http.post("url", this.viejucoJson, this.httpOptions);
    obs.subscribe(resultado => {
      this.respuesta = resultado;
      this.visibleTs = true;
     
      console.log(this.respuesta);

    })

  }


  dameTs() {
    this.visibleTs = false;
    this.paramGen.param.Tabla = 'ts';
    this.paramGen.param.Filtro = "sw_del = 0 and co_inversion= 'DD' ";

    let obs = this.http.post(environment.url, this.paramGen, this.httpOptions);

    obs.subscribe(resultado => {
      this.jsonTs = resultado;
      this.visibleTs = true;

      console.log(this.jsonTs);
    })


    this.visibleMoneda = false;
    this.paramGen.param.Tabla = 'moneda';
    this.paramGen.param.Filtro = "";

    obs = this.http.post(environment.url, this.paramGen, this.httpOptions);

    obs.subscribe(resultado => {
      this.visibleMoneda = true;

      this.jsonMon = resultado;
      console.log(this.jsonMon);
    })

    this.visibleForma = false;
    this.paramGen.param.Tabla = 'forma';
    this.paramGen.param.Filtro = "";

    obs = this.http.post(environment.url, this.paramGen, this.httpOptions);

    obs.subscribe(resultado => {
      this.visibleForma = true;

      this.jsonForma = resultado;
      console.log(this.jsonForma);
    })

  }

  dameDatosM() {
    this.paramXXX.param.Codigo = 'PE'
    this.paramXXX.param.Tpcodigo = 'N'

    const obs = this.http.post('http://la2K12.eastus.cloudapp.azure.com:8079/pview/PViewISAPI.dll/la/rest/TView/WBusca_DatosM',
      this.paramXXX, this.httpOptions);
    obs.subscribe(resultado => {
      this.jsonDatosM = resultado;
      console.log(resultado);
    })
  }

  pintaConsola() {
    console.log(this.jsonMon);
    console.log(this.jsonTs);
  }

  dameTitulos() {
    this.paramXXX.param.Codigo = 'C'
    this.paramXXX.param.Tpcodigo = ''

    const obs = this.http.post('http://la2K12.eastus.cloudapp.azure.com:8079/pview/PViewISAPI.dll/la/rest/TView/WBusca_Titulos',
      this.paramXXX, this.httpOptions);
    obs.subscribe(resultado => {
      this.jsonTitulos = resultado;
      console.log(resultado);
    })
  }







}
