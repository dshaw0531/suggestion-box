import { Component } from '@angular/core';
import { SuggestionService } from '../shared/suggestion.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-suggestion',
  templateUrl: './new-suggestion.component.html',
  styleUrls: ['./new-suggestion.component.scss']
})
export class NewSuggestionComponent {

  public suggestion: any;
  public formErrors: any;
  public emptyTextError = false;
  public invalidEmail = false;

  constructor(private suggestionService: SuggestionService, private router: Router) {
    this.suggestionService = suggestionService;
    this.router = router;
    this.suggestion = {
      suggestionText: '',
      details: '',
      name: '',
      email: ''
    };
   }

  submitData() {
    this.validateForm();
    this.validateEmail();
    if (!this.emptyTextError && !this.invalidEmail) {
      this.suggestionService.addSuggestion(this.suggestion);
      this.router.navigate(['./suggestions', { success: true }]);
    }
  }

  validateForm() {
    for (const key in this.suggestion) {
      if (this.suggestion.hasOwnProperty(key)) {
        if (this.isStringEmpty(this.suggestion[key])) {
          this.emptyTextError = true;
          return;
        }
      }
    }
    this.emptyTextError = false;
  }

  validateEmail() {
    const re = /[a-zA-Z]*@reliaslearning.com/;
    this.invalidEmail = !re.test(this.suggestion.email);
  }

  isStringEmpty(string: string): boolean {
    return !string.replace(/\s/g, '').length;
  }



}
