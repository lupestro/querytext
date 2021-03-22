import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ModelService extends Service {
  @tracked value = 12;
  @tracked errorText = '';
  parse(textValue) {
    // Test
    let value = this.value;
    this.errorText = this.validateParse(textValue);
    if (!this.errorText) {
      value = parseInt(textValue);
      return value;
    }
    return;
  }
  update(newValue) {
    if (typeof newValue === 'undefined') {
      return;
    }
    this.errorText = this.validateValue(newValue);
    if (this.errorText) {
      return;
    }
    this.value = newValue;
    this.errorText = '';
    return newValue;
  }
  format(value) {
    return '' + value;
  }
  validateParse(value) {
    if (!/^\d+$/.test(value)) {
      return `${value} is not a number`;
    } else {
      return '';
    }
  }
  validateValue(value) {
    if (value < 1 || value > 20) {
      return `Value ${value} is out of range`;
    } else {
      return '';
    }
  }
}
