import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class FormInputComponent extends Component {
  contents = {
    formText: this.args.contents.inputText,
  };

  @action valueChanged(targetName, value) {
    this.contents[targetName] = value;
  }
  @action submitted(event) {
    this.reportSubmit();
    event.preventDefault();
  }
  @action fieldChanged() {
    this.reportSubmit();
  }

  reportSubmit() {
    if (this.args.submitted) {
      this.args.submitted(this.contents);
    }
  }
}
