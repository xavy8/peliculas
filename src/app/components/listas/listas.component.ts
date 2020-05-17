import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Lista } from '../../models/lista.model';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @Input() completado = true;
  @ViewChild(IonList, { static: true }) lista: IonList;
  buscar = '';

  constructor( public peliculasService: PeliculasService,
               private router: Router,
               private alertCtrl: AlertController ) { }

  ngOnInit() {}

  listaSeleccionada( lista: Lista ) {
    if ( this.completado ) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${ lista.id }`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${ lista.id }`);
    }
  }

  borrarLista( lista: Lista ) {
    this.peliculasService.borrarLista( lista );
  }

  async editarLista( lista: Lista) {
    const alert = await this.alertCtrl.create({
      header: 'Editar lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: ( data ) => {
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Editar',
          handler: ( data ) => {
            if (data.titulo.length === 0) {
              return;
            }

            lista.titulo = data.titulo;
            this.peliculasService.guardarStorage();
            this.lista.closeSlidingItems();
          }
        }
      ]
    });
    alert.present();
  }

  busqueda(event: any) {
    this.buscar = event.target.value;
  }

  async confirmarEliminar( lista: Lista ) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar lista',
      message: '¿Seguro deseas eliminar la lista? Se borrarán todos los items que contenga.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: ( data ) => {
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Eliminar',
          handler: ( data ) => {
            this.borrarLista( lista );
          }
        }
      ]
    });
    alert.present();
  }
}
