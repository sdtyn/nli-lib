import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NLIDatefield } from './component/nli-datefield';
import { ClickOutsideElement } from './core/ClickOutsideElement';
import { LibModule as NliInputModule} from '@next-level-integration/nli-input-lib';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    NLIDatefield,
    ClickOutsideElement
  ],
  imports: [
    CommonModule,
    NliInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [NLIDatefield],
  providers: [],
  bootstrap: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class NLIDateFieldModule {}
