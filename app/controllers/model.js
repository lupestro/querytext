import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ModelController extends Controller {
  // Query parameters - controller only stuff
  queryParams = ['text'];
  @tracked text = '5';
  validValue = '12';
  invalidValue = '22';

  // Input field values
  @tracked formContents = { formText: '' };
  @tracked queryValue = '';

  // Lifecycle

  onRouted(/*model, transition*/) {
    this.queryValue = this.text;
    this.testSetModelValue(this.text);
  }

  // User inputs

  @action changeQueryParameter(value) {
    this.queryValue = value;
  }
  @action formSubmitted(contents) {
    this.formContents = contents;
    this.testSetModelValue(contents.formText);
  }
  @action loadClicked(loadValidValue) {
    if (loadValidValue) {
      this.testSetModelValue(this.validValue);
    } else {
      this.testSetModelValue(this.invalidValue);
    }
  }

  // Orchestrate
  testSetModelValue(valueText) {
    let value = this.model.parse(valueText);
    if (typeof value !== 'undefined') {
      value = this.model.update(value);
    }
    if (typeof value !== 'undefined') {
      this.text = this.model.format(value);
    }
    return typeof value !== 'undefined';
  }
}
