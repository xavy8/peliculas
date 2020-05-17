import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from '../models/lista.model';

@Pipe({
  name: 'filtroComprado',
  pure: false
})
export class FiltroCompradoPipe implements PipeTransform {

  transform( listas: Lista[], completado: boolean = true ): Lista[] {
    return listas.filter( lista => lista.completado === completado );
  }

}
