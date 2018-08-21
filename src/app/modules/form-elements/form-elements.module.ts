import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

//App Modules
//import { AppRoutingModule } from '../routing/app-routing.module';

import {
  MatDatepickerModule, 
  MatNativeDateModule, 
  MatButtonModule,
  MatButtonToggleModule, 
  MatIconModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';



//Development Modules
import { NLIDateFieldModule } from '../../lib/components/nli-datefield/datefield.module';

//Samples
import { NLIDatepicker } from './nli-datepicker/nli-datepicker.component';

const routes: Routes = [
  { path: 'formelements/datepicker', 		component: NLIDatepicker }
];

@NgModule({
  declarations: [
    NLIDatepicker
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NLIDateFieldModule,
    BrowserModule,
  	NoopAnimationsModule,
  	FormsModule,
  	ReactiveFormsModule,
    MatButtonModule,
    MatButtonToggleModule, 
  	MatNativeDateModule,
    MatDatepickerModule,
    //MyDateRangePickerModule,
    MatIconModule,
    MatTabsModule,
    MatFormFieldModule ,
    MatInputModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [NLIDatepicker],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class FormElementsModule { }
