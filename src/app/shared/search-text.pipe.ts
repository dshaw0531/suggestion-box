import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchText'
})
export class SearchTextPipe implements PipeTransform {

  transform(items: any, filter?: any): any {
    if (!items || !filter) {
      return items;
    }

    return items.filter(item => item.suggestionText.toLowerCase().indexOf(filter.toLowerCase()) !== -1
      || item.details.toLowerCase().indexOf(filter.toLowerCase()) !== -1
      || item.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1
      || item.email.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
  }
}
