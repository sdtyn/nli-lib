import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormElementsModule } from './modules/form-elements/form-elements.module';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormElementsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
