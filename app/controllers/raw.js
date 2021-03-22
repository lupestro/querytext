import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class RawController extends Controller {
  // Query parameters - controller only stuff
  queryParams = ['text'];
  @tracked text = '5';

  // Input field values
  @tracked queryValue = '';
  @tracked formContents = { formText: '' };

  // Model values
  @tracked modelValue = 12;
  @tracked errorText = '';

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
    let value = this.modelValue;
    // Test
    let errorText = this.validateParse(valueText);
    if (!errorText) {
      value = parseInt(valueText);
      errorText = this.validateNumeric(value);
    }
    // Set
    if (!errorText) {
      this.modelValue = value;
      this.text = '' + value;
      this.errorText = '';
    } else {
      this.errorText = errorText;
    }
    // Report
    return !errorText;
  }

  // Validate

  validateParse(value) {
    if (!/^\d+$/.test(value)) {
      return `${value} is not a number`;
    } else {
      return '';
    }
  }
  validateNumeric(value) {
    if (value < 1 || value > 20) {
      return `Value ${value} is out of range`;
    } else {
      return '';
    }
  }
}
