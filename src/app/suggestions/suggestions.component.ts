import { Component, OnInit } from '@angular/core';
import { SuggestionService } from '../shared/suggestion.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss']
})
export class SuggestionsComponent implements OnInit {

  public suggestions: any;
  public success = false;

  constructor(private suggestionService: SuggestionService, private route: ActivatedRoute) {
    this.route = route;
    this.suggestionService = suggestionService;
    this.suggestions = {};
   }

  ngOnInit() {
    this.suggestions = this.suggestionService.getSuggestions();
    this.success = this.route.snapshot.params['success'];
  }

  deleteSuggestion(suggestionKey: any) {
    this.suggestionService.deleteSuggestion(suggestionKey);
  }
}
