import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class QueryController extends Controller {
  @service('model') modelService;
  @service url;
  //TODO: Query parameter service

  // Query parameters - controller only stuff
  queryParams = ['text'];
  @tracked text = '5';
  validValue = '14';
  invalidValue = '24';

  // Input field values
  @tracked queryValue = '';
  @tracked formContents = { formText: '' };

  // Lifecycle

  onRouted(/*model, transition*/) {
    this.url.collectSpareQueryParameters(window.location, this.queryParams);
    Promise.resolve().then(() => {
      this.testSetModelValue(this.url.text);
    });
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
    let value = this.modelService.parse(valueText);
    if (typeof value !== 'undefined') {
      value = this.modelService.update(value);
    }
    if (typeof value !== 'undefined') {
      this.url.updateText(this.modelService.format(value));
    }
    return typeof value !== 'undefined';
  }
}
