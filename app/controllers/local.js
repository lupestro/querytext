import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class LocalController extends Controller {
  // Query parameters
  queryParams = ['text'];
  @tracked text = '5';
  validValue = '15';
  invalidValue = '25';
  changeset;

  // Input field values
  @tracked queryValue = '';
  @tracked formContents = { formText: '' };
  //  changeset =   {{#let (changeset data=this.modelService.value validate=this.modelService.validate) as | changeset | }}
  //  {{/let}}

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
    this.testSetModelValueFromForm(contents.formText);
  }
  @action loadClicked(loadValidValue) {
    if (loadValidValue) {
      this.testSetModelValue(this.validValue);
    } else {
      this.testSetModelValue(this.invalidValue);
    }
  }

  // Orchestrate

  testSetModelValueFromForm(valueText) {
    let value = this.modelService.parse(valueText);
    if (typeof value !== 'undefined') {
      value = this.modelService.update(value);
      this.text = this.modelService.format(value);
    }
    return typeof value !== 'undefined';
  }
  testSetModelValue(valueText) {
    let value = this.modelService.parse(valueText);
    if (typeof value !== 'undefined') {
      value = this.modelService.update(value);
      this.text = this.modelService.format(value);
    }
    return typeof value !== 'undefined';
  }
}
