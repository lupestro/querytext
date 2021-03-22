import Route from '@ember/routing/route';

export default class RawRoute extends Route {
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
