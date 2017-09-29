import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SuggestionService } from '../shared/suggestion.service';
import { AuthService } from '../auth.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-resolved-suggestions',
  templateUrl: './resolved-suggestions.component.html',
  styleUrls: ['./resolved-suggestions.component.scss']
})
export class ResolvedSuggestionsComponent implements OnInit {
  @ViewChild('viewEndorsementsModal') viewEndorsementsModal: ElementRef;
  public suggestions: any;
  public searchText: any;
  public endorsements: any[];
  openModalRef: NgbModalRef;

  constructor(private suggestionService: SuggestionService, private authService: AuthService, public modalService: NgbModal) {
    this.suggestionService = suggestionService;
    this.suggestions = {};
  }

  ngOnInit() {
    this.suggestions = this.suggestionService.getSuggestions();
  }

  openViewEndorsementsModal(endorseItem: any): void {
    this.endorsements = endorseItem.endorsements;
    this.openModalRef = this.modalService.open(this.viewEndorsementsModal, { windowClass: 'modal-wrapper-sm' });
  }
}
