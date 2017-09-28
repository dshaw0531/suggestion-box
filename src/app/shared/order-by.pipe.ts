import { Pipe, PipeTransform } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import 'rxjs/add/operator/map';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value: FirebaseListObservable<any[]>, args?: any): any {
    return value.map(suggestions => suggestions.sort((a, b) => {
      a.endorsements = a.endorsements || [];
      b.endorsements = b.endorsements || [];
      return b.endorsements.length - a.endorsements.length;
    }));
  }
}
