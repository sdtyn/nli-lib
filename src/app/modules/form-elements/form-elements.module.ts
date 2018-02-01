import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from '../../app-routing.module';

import { NLILibModule } from '../../lib/lib.module';

import { NLIDatepicker } from './nli-datepicker/nli-datepicker.component';
import { NLITextInput } from './nli-textinput/nli-textinput.component';

import { LibModule as NliInputModule} from '@next-level-integration/nli-input-lib';


const routes: Routes = [
  { path: 'formelements/datepicker', 		component: NLIDatepicker },
  { path: 'formelements/textinput', 		component: NLITextInput }
];

@NgModule({
  declarations: [
    NLIDatepicker,
    NLITextInput    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NliInputModule,
    NLILibModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [NLIDatepicker],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class FormElementsModule { }
