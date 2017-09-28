import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SuggestionService } from '../shared/suggestion.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss']
})
export class SuggestionsComponent implements OnInit {
  @ViewChild('confirmDeleteModal') confirmDeleteModal: ElementRef;
  @ViewChild('endorseModal') endorseModal: ElementRef;
  @ViewChild('viewEndorsementsModal') viewEndorsementsModal: ElementRef;
  public suggestions: any;
  public success = false;
  public invalidEmail = false;
  public endorsement: any;
  public duplicateEndorsement = false;
  public searchText: any;
  openModalRef: NgbModalRef;
  currentSuggestion: any;

  constructor(private suggestionService: SuggestionService, public modalService: NgbModal,
      private route: ActivatedRoute, private authService: AuthService) {
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
    console.log(this.authService.user);
  }

  openDeleteModal(deleteItem: any): void {
    this.currentSuggestion = deleteItem;
    this.openModalRef = this.modalService.open(this.confirmDeleteModal, { windowClass: 'modal-wrapper-sm' });
  }

  openEndorseModal(endorseItem: any): void {
    this.endorsement.name = '';
    this.endorsement.email = '';
    this.duplicateEndorsement = false;
    this.invalidEmail = false;
    this.currentSuggestion = endorseItem;
    this.openModalRef = this.modalService.open(this.endorseModal, { windowClass: 'modal-wrapper-sm' });
  }

  openViewEndorsementsModal(endorseItem: any): void {
    this.endorsement.name = '';
    this.endorsement.email = '';
    this.duplicateEndorsement = false;
    this.invalidEmail = false;
    this.currentSuggestion = endorseItem;
    this.openModalRef = this.modalService.open(this.viewEndorsementsModal, { windowClass: 'modal-wrapper-sm' });
  }

  deleteSuggestion() {
    this.suggestionService.deleteSuggestion(this.currentSuggestion.$key);
  }

  endorseSuggestion() {
    if (this.currentSuggestion.email === this.endorsement.email) {
      this.duplicateEndorsement = true;
    } else {
      if (!this.currentSuggestion.endorsements) {
        this.currentSuggestion.endorsements = new Array();
      } else {
        this.duplicateEndorsement = !!this.currentSuggestion.endorsements.find(e => e.email === this.endorsement.email);
      }
    }

    this.validateEmail();

    if (!this.duplicateEndorsement && !this.invalidEmail) {
      this.currentSuggestion.endorsements.push(this.endorsement);
      this.suggestionService.endorseSuggestion(this.currentSuggestion);
      this.openModalRef.close();
    }
  }

  validateEmail() {
    const re = /[a-zA-Z]*@reliaslearning.com/;
    this.invalidEmail = !re.test(this.endorsement.email);
  }
}
