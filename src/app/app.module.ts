import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ListComponent } from './pages/items/list/list.component';
import { DetailsComponent } from './pages/items/details/details.component';
import { ErrorComponent } from './pages/error/error.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormErrorsComponent} from "./components/form-errors/form-errors/form-errors.component";
import { SigninComponent } from './pages/auth/signin/signin.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListComponent,
    DetailsComponent,
    ErrorComponent,
    FormErrorsComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
