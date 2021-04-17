import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  loadAction;
  @tracked loadDisabled = true;

  onChildRouted(loadAction) {
    this.loadDisabled = false;
    this.loadAction = loadAction;
    if (!this.loadAction) {
      this.loadDisabled = true;
    }
  }

  // User input
  @action clickedLoad(useValidValue) {
    if (this.loadAction) {
      this.loadAction(useValidValue);
    }
  }
}
