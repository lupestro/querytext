import Route from '@ember/routing/route';

export default class LocalRoute extends Route {
  setupController(controller, model, transition) {
    super.setupController(controller, model, transition);
    // eslint-disable-next-line ember/no-controller-access-in-routes
    this.controllerFor('application').onChildRouted(
      controller.validClicked,
      controller.invalidClicked
    );
  }
}
