import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NLIDatefield } from './components/datefield/nli-datefield.component';

import { LibModule as NliInputModule} from '@next-level-integration/nli-input-lib';
@NgModule({
  declarations: [
    NLIDatefield
  ],
  imports: [
    CommonModule,
    NliInputModule
  ],
  exports: [NLIDatefield],
  providers: [],
  bootstrap: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class NLILibModule { }
