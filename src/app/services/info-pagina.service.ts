import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { InfoPaginaInterface } from "../interfaces/info-pagina.interface";

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPaginaInterface = {};
  cargada = false;
  equipo: any[] = [];

  constructor(private http: HttpClient) {
    console.log('Cargandooo....');
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo() {
    //Leer JSON
    this.http.get('assets/data/data-pagina.json')
      .subscribe((resp: InfoPaginaInterface) => {
        this.cargada = true;
        this.info = resp;
      })
  }

  private cargarEquipo() {
    // Leer JSON
    this.http.get('https://angular-html-20efc-default-rtdb.firebaseio.com/equipo.json')
      .subscribe((resp: any) => {
        this.equipo = resp;
        console.log(resp);
      })
  }
}
