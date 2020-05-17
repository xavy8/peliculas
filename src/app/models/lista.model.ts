import { ListaItem } from './lista-item.model';

export class Lista {
    id: number;
    titulo: string;
    fechaCreacion: Date;
    fechaTerminada: Date;
    completado: boolean;
    items: ListaItem[];

    constructor( titulo: string ) {
        this.titulo = titulo;
        this.fechaCreacion = new Date();
        this.completado = false;
        this.items = [];
        this.id = new Date().getTime();
    }
}
