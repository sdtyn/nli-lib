import { Component } from '@angular/core';

@Component({
  selector: 'nli-textinput',
  templateUrl: './template.html',
  styleUrls: ['./styles.scss']
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
