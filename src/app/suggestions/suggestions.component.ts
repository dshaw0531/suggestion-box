import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SuggestionService } from '../shared/suggestion.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss']
})
export class SuggestionsComponent implements OnInit {
  @ViewChild('confirmDeleteModal') confirmDeleteModal: ElementRef;
  @ViewChild('endorseModal') endorseModal: ElementRef;
  public suggestions: any;
  public success = false;
  public endorsement: any;
  openModalRef: NgbModalRef;
  currentSuggestion: any;

  constructor(private suggestionService: SuggestionService, public modalService: NgbModal, private route: ActivatedRoute) {
    this.suggestionService = suggestionService;
    this.suggestions = {};
    this.endorsement = {
      name: '',
      email: ''
    };

    this.route = route;
   }

  ngOnInit() {
    this.suggestions = this.suggestionService.getSuggestions();
    this.success = this.route.snapshot.params['success'];
  }

  openDeleteModal(deleteItem: any): void {
    this.currentSuggestion = deleteItem;
    this.openModalRef = this.modalService.open(this.confirmDeleteModal, { windowClass: 'modal-wrapper-sm' });
  }

  openEndorseModal(endorseItem: any): void {
    this.currentSuggestion = endorseItem;
    this.openModalRef = this.modalService.open(this.endorseModal, { windowClass: 'modal-wrapper-sm' });
  }

  deleteSuggestion(suggestionKey: any) {
    this.suggestionService.deleteSuggestion(suggestionKey);
  }
}
