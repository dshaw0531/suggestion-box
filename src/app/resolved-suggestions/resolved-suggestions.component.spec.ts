import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolvedSuggestionsComponent } from './resolved-suggestions.component';

describe('ResolvedSuggestionsComponent', () => {
  let component: ResolvedSuggestionsComponent;
  let fixture: ComponentFixture<ResolvedSuggestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolvedSuggestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolvedSuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
