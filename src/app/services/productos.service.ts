import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ProductosInterface } from '../interfaces/productos.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  productos: ProductosInterface[] = [];
  productosFiltrado: ProductosInterface[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {

    return new Promise( (resolve, reject) => {
      this.http.get('https://angular-html-20efc-default-rtdb.firebaseio.com/productos_idx.json')
        .subscribe((resp: any) => {
          this.productos = resp;
          this.cargando = false;
          // this.productosFiltrado = this.productos;
          // resolve();
        });

    });
  }

  getProducto( id: string) {
    return this.http.get( `https://angular-html-20efc-default-rtdb.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto( termino: string) {
    if (this.productos.length === 0) {
      //cargar productos
      this.cargarProductos().then( ()=> {
        //despeus de cargar
        //aplicar filtros
        this.filtrarProductos( termino );
      } );
    } else {
      this.filtrarProductos(termino);
    }
    /*this.productosFiltrado = this.productos.filter( producto => {
      return true;
    });
    console.log(this.productosFiltrado);*/
  }

  private filtrarProductos ( termino: string ){
    console.log(this.productosFiltrado);
    this.productosFiltrado = [];
    this.productos.forEach( prod => {
      // @ts-ignore
      if(prod.categoria.indexOf(termino) >= 0 || prod.titulo.indexOf(termino) >= 0) {
        this.productosFiltrado.push(prod);
      }
    } )
  }
}
