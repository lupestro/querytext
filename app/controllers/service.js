import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ServiceController extends Controller {
  @service('model') modelService;

  // Query parameters - controller only stuff
  queryParams = ['text'];
  @tracked text = '5';

  // Input field values
  @tracked queryValue = '';
  @tracked formContents = { formText: '' };

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
    let value = this.modelService.parse(valueText);
    if (typeof value !== 'undefined') {
      value = this.modelService.update(value);
    }
    if (typeof value !== 'undefined') {
      this.text = this.modelService.format(value);
    }
    return typeof value !== 'undefined';
  }
}
