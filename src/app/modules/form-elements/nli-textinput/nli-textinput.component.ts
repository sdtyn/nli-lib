import { Component } from '@angular/core';

@Component({
  selector: 'nli-textinput',
  templateUrl: './nli-textinput.component.html',
  styleUrls: ['./nli-textinput.component.scss']
})
export class NLITextInput {
  title = 'textinput';

  public loginModel:Object = {username:"asdasd"};


  public fc(){
  } 

  ifDefined(){
    return {};
  }
}
