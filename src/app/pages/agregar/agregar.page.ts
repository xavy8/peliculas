import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { ListaItem } from '../../models/lista-item.model';
import { timingSafeEqual } from 'crypto';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista;
  nombreItem = '';

  constructor( private peliculasService: PeliculasService,
               private route: ActivatedRoute ) {
    const listaId = this.route.snapshot.paramMap.get('listaId');

    this.lista = this.peliculasService.obtenerLista( listaId );
  }

  ngOnInit() {
  }

  agregarItem() {
    if (this.nombreItem.length === 0) {
      return;
    }

    const nuevoItem = new ListaItem( this.nombreItem );
    this.lista.items.push( nuevoItem );

    this.nombreItem = '';

    this.peliculasService.guardarStorage();
  }

  cambioEstado( item: ListaItem ) {
    const pendientes = this.lista.items.filter( itemData => !itemData.comprado ).length;

    if ( pendientes === 0 ) {
      this.lista.fechaTerminada = new Date();
      this.lista.completado = true;
    } else {
      this.lista.fechaTerminada = null;
      this.lista.completado = false;
    }

    this.peliculasService.guardarStorage();
  }

  borrar( i: number ) {
    this.lista.items.splice(i, 1);
    this.peliculasService.guardarStorage();
  }

}
