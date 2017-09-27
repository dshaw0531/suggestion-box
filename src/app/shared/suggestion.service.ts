import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SuggestionService {
  suggestions: FirebaseListObservable<any[]>;

  constructor(public af: AngularFireDatabase) {
    this.suggestions = af.list('/suggestions');
  }

  addSuggestion(suggestion: any) {
    this.suggestions.push(suggestion);
  }

  getSuggestions() {
    return this.suggestions;
  }
}
