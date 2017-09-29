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
  @ViewChild('resolveModal') resolveModal: ElementRef;
  public suggestions: any;
  public success = false;
  public invalidEmail = false;
  public nameEmpty = false;
  public endorsement: any;
  public endorsements: any[];
  public duplicateEndorsement = false;
  public searchText: any;
  public resolutionComments: string;
  public resolutionFieldsEmpty = false;
  public resolverName: string;
  openModalRef: NgbModalRef;
  currentSuggestion: any;

  constructor(private suggestionService: SuggestionService, public modalService: NgbModal,
    private route: ActivatedRoute, private authService: AuthService) {
    this.suggestionService = suggestionService;
    this.suggestions = {};
    this.endorsement = {
      name: '',
      email: '',
      comments: ''
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

  openResolveModal(resolveItem: any): void {
    this.resolutionComments = this.resolverName = '';
    this.resolutionFieldsEmpty = false;
    this.currentSuggestion = resolveItem;
    this.openModalRef = this.modalService.open(this.resolveModal, { windowClass: 'modal-wrapper-sm' });
  }

  openEndorseModal(endorseItem: any): void {
    this.endorsement.name = '';
    this.endorsement.email = '';
    this.endorsement.comments = '';
    this.duplicateEndorsement = false;
    this.invalidEmail = false;
    this.nameEmpty = false;
    this.currentSuggestion = endorseItem;
    this.openModalRef = this.modalService.open(this.endorseModal, { windowClass: 'modal-wrapper-sm' });
  }

  openViewEndorsementsModal(endorseItem: any): void {
    this.endorsements = endorseItem.endorsements;
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
    this.validateName();

    if (!this.duplicateEndorsement && !this.invalidEmail && !this.nameEmpty) {
      this.currentSuggestion.endorsements.push(this.endorsement);
      this.suggestionService.updateSuggestion(this.currentSuggestion);
      this.openModalRef.close();
    }
  }

  resolveSuggestion() {
    if (!this.resolutionComments || !this.resolverName) {
      this.resolutionFieldsEmpty = true;
    } else {
      this.resolutionFieldsEmpty = false;
    }

    if (!this.resolutionFieldsEmpty) {
      this.currentSuggestion.resolutionComments = this.resolutionComments;
      this.currentSuggestion.resolverName = this.resolverName;
      this.suggestionService.updateSuggestion(this.currentSuggestion);
      this.openModalRef.close();
    }
  }

  validateName() {
    this.nameEmpty = !this.endorsement.name.replace(/\s/g, '').length;
  }

  validateEmail() {
    const re = /[a-zA-Z]*@reliaslearning.com/;
    this.invalidEmail = !re.test(this.endorsement.email);
  }
}
