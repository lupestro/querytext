import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class GlobalController extends Controller {
  // Query parameters
  queryParams = ['text'];
  @tracked text = '5';
  validValue = '16';
  invalidValue = '26';

  @action loadClicked(loadValidValue) {
    if (loadValidValue) {
      this.testSetModelValue(this.validValue);
    } else {
      this.testSetModelValue(this.invalidValue);
    }
  }
}
