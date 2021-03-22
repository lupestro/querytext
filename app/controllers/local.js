import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class LocalController extends Controller {
  // Query parameters
  queryParams = ['text'];
  @tracked text = '5';
  @action validClicked() {}
  @action invalidClicked() {}
}
