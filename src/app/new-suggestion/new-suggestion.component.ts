import { Component, OnInit } from '@angular/core';
import { SuggestionService } from '../shared/suggestion.service';
@Component({
  selector: 'app-new-suggestion',
  templateUrl: './new-suggestion.component.html',
  styleUrls: ['./new-suggestion.component.scss']
})
export class NewSuggestionComponent implements OnInit {

  public suggestion: any;

  constructor(private suggestionService: SuggestionService) {
    this.suggestionService = suggestionService;
    this.suggestion = {};
   }

  ngOnInit() {
    // this.suggestionService.addSuggestion();
  }

  submitData() {
    this.suggestionService.addSuggestion(this.suggestion);
  }



}
