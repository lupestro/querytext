import Component from '@glimmer/component';
import { action } from '@ember/object';

/*
interface TextInputComponentArgs {
    id: string;
    labelText: string;
    value: text;
    changed: (value:string) => void;
    input: (value: string) => void;
}
*/
export default class TextInputComponent extends Component {
  @action change(event) {
    if (this.args.changed) {
      this.args.changed(event.target.value);
    }
  }
  @action getInput(event) {
    if (this.args.input) {
      this.args.input(event.target.value);
    }
  }
}
