import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from '../models/lista.model';

@Pipe({
  name: 'buscador',
  pure: false
})
export class BuscadorPipe implements PipeTransform {

  transform(lista: Lista[], buscar: string): Lista[] {
    return lista.filter( listaBuscar => listaBuscar.titulo.toLowerCase().includes( buscar.toLowerCase() ) );
  }

}
