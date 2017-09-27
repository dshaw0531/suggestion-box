import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSuggestionComponent } from './new-suggestion.component';

describe('NewSuggestionComponent', () => {
  let component: NewSuggestionComponent;
  let fixture: ComponentFixture<NewSuggestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSuggestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
