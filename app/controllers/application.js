import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  validAction = null;
  invalidAction = null;
  @tracked validDisabled = true;
  @tracked invalidDisabled = true;

  onChildRouted(validAction, invalidAction) {
    this.validDisabled = false;
    this.invalidDisabled = false;
    this.validAction = validAction;
    this.invalidAction = invalidAction;
    if (!this.validAction) {
      this.validDisabled = true;
    }
    if (!this.invalidAction) {
      this.invalidDisabled = true;
    }
  }

  // User input
  @action clickedLoadValid() {
    if (this.validAction) {
      this.validAction();
    }
  }
  @action clickedLoadInvalid() {
    if (this.invalidAction) {
      this.invalidAction();
    }
  }
}
