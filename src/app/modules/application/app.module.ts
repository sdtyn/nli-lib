import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from '../routing/app-routing.module';
import { FormElementsModule } from '../../modules/form-elements/form-elements.module';

import { AppComponent } from './main/app.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormElementsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
