import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

  // tslint:disable-next-line:variable-name
  transform(lista: any[], page_size: number | string, page_number: number): any[] {
    if (!lista?.length) { return []; }
    if (page_size === 'all') {
      return lista;
    }
    page_size = page_size || 3;
    page_number = page_number || 1;
    --page_number;
    // @ts-ignore
    return lista.slice(page_number * page_size, (page_number + 1) * page_size);
  }

}
