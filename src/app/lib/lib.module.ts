import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NLIDatefield } from './components/nli-datefield/component/nli-datefield';

@NgModule({
  declarations: [
    NLIDatefield
  ],
  imports: [
    CommonModule
  ],
  exports: [NLIDatefield],
  providers: [],
  bootstrap: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class NLILibModule { }
