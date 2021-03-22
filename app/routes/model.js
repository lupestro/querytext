import Route from '@ember/routing/route';
import QueryTextModel from '../models/query-text';

export default class ModelRoute extends Route {
  model() {
    return new QueryTextModel();
  }
  setupController(controller, model, transition) {
    super.setupController(controller, model, transition);
    controller.onRouted();
    // eslint-disable-next-line ember/no-controller-access-in-routes
    this.controllerFor('application').onChildRouted(
      controller.validClicked,
      controller.invalidClicked
    );
  }
}
