import { Component, OnInit } from '@angular/core';
import { HttpClient  } from "@angular/common/http";
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-metodos',
  templateUrl: './metodos.component.html',
  styleUrls: ['./metodos.component.css']
})
export class MetodosComponent implements OnInit {

  jsonMoneda : any;

  constructor(private http : HttpClient) { }

  ngOnInit(): void {
  }

  onClick(){
    this.dameMoneda();
  }

  
  dameMoneda(){
    const obs = this.http.get(environment.url);

    obs.subscribe(resultado => {
      this.jsonMoneda = resultado;
    })
  }

}
