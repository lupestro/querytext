import EmberRouter from '@ember/routing/router';
import config from 'querytext/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('raw');
  this.route('text');
  this.route('model');
  this.route('url');
  this.route('local');
  this.route('service');
  this.route('global');
});
