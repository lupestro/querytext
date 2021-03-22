import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ModelController extends Controller {
  // Query parameters - controller only stuff
  queryParams = ['text'];
  @tracked text = '5';

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
  @action validClicked() {
    this.testSetModelValue('13');
  }
  @action invalidClicked() {
    this.testSetModelValue('25');
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
