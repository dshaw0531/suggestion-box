import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

// import { AngularFireAuthModule } from 'angularfire2/auth';  // May use later - imports firebase/auth, only needed for auth features
import { environment } from '../environments/environment';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewSuggestionComponent } from './new-suggestion/new-suggestion.component';
import { SuggestionsComponent } from './suggestions/suggestions.component';
import { SuggestionService } from './shared/suggestion.service';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'new-suggestion', component: NewSuggestionComponent },
  { path: 'suggestions', component: SuggestionsComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewSuggestionComponent,
    SuggestionsComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(
      appRoutes
    ),
    FormsModule
    // AngularFireAuthModule  // May use later - imports firebase/auth, only needed for auth features
  ],
  providers: [
    SuggestionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
