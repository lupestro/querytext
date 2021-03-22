import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class UrlService extends Service {
  @service router;
  extras = {};
  collectSpareQueryParameters(location, whitelist) {
    this.extras = [];
    for (const [key, value] of new URLSearchParams(location.search)) {
      if (!whitelist.includes(key)) {
        this.extras[key] = value;
      }
    }
  }
  get spareQueryParameters() {
    let finalUrl = '';
    let first = true;
    for (const [key, value] of this.extras) {
      if (first) {
        first = false;
      } else {
        finalUrl += '&';
      }
      finalUrl += `${key}=${value}`;
    }
    return finalUrl;
  }
  get text() {
    return this.router.currentRoute.queryParams.text ?? '5';
  }
  updateText(value) {
    this.router.transitionTo(this.router.currentRouteName, {
      queryParams: { text: value },
    });
  }
}
