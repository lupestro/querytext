import Route from '@ember/routing/route';

export default class GlobalRoute extends Route {
  setupController(controller, model, transition) {
    super.setupController(controller, model, transition);
    // eslint-disable-next-line ember/no-controller-access-in-routes
    this.controllerFor('application').onChildRouted(
      controller.validClicked,
      controller.invalidClicked
    );
  }
}
