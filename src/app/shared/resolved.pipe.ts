import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resolved'
})
export class ResolvedPipe implements PipeTransform {

  transform(items: any, filter?: boolean): any {
    if (filter) {
      return items.filter(item => item.resolutionComments);
    } else {
      return items.filter(item => !item.resolutionComments);
    }
  }
}
