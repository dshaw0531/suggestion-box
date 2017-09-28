import { Component, OnInit } from '@angular/core';
import { SuggestionService } from '../shared/suggestion.service';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss']
})
export class SuggestionsComponent implements OnInit {

  public suggestions: any;

  constructor(private suggestionService: SuggestionService) {
    this.suggestionService = suggestionService;
    this.suggestions = {};
   }

  ngOnInit() {
    this.suggestions = this.suggestionService.getSuggestions();
    console.log(this.suggestions);
  }

  deleteSuggestion(suggestionKey: any) {
    this.suggestionService.deleteSuggestion(suggestionKey);
  }
}
