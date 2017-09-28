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
  public duplicateEndorsement = false;
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
    this.endorsement.name = '';
    this.endorsement.email = '';
    this.currentSuggestion = endorseItem;
    this.openModalRef = this.modalService.open(this.endorseModal, { windowClass: 'modal-wrapper-sm' });
  }

  deleteSuggestion() {
    this.suggestionService.deleteSuggestion(this.currentSuggestion.$key);
  }

  endorseSuggestion() {
    this.duplicateEndorsement = false;
    if (!this.currentSuggestion.endorsements) {
      this.currentSuggestion.endorsements = new Array();
    } else {
      this.currentSuggestion.endorsements.forEach(element => {
        if (element.email === this.endorsement.email) {
          this.duplicateEndorsement = true;
        }
      });
    }

    if (!this.duplicateEndorsement) {
      this.currentSuggestion.endorsements.push(this.endorsement);
      this.suggestionService.endorseSuggestion(this.currentSuggestion);
    }
  }
}
