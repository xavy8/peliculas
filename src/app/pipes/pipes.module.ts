import { NgModule } from '@angular/core';
import { FiltroCompradoPipe } from './filtro-comprado.pipe';
import { BuscadorPipe } from './buscador.pipe';

@NgModule({
  declarations: [FiltroCompradoPipe, BuscadorPipe],
  exports: [FiltroCompradoPipe, BuscadorPipe]
})
export class PipesModule { }
