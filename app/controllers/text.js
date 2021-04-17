import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

/*
<label for="formval" >Enter a number between 1 and 20:</label>
<input 
  id="formval" type="text" 
  value={{this.formText}} 
  {{on 'input' this.valueChanged}}
  {{on 'change' this.changeSubmitted}}
/> 

<p class="value-line">Model Value: <span class="value">{{this.modelValue}}</span></p>
<p class="error">{{this.errorText}}</p>
*/

export default class TextController extends Controller {
  @tracked formText = '';
  @tracked modelValue = 12;
  @tracked errorText = '';

  @action valueChanged(event) {
    this.formText = event.target.value;
  }
  @action changeSubmitted() {
    this.testSetModelValue(this.formText);
  }
  @action loadClicked(loadValidValue) {
    if (loadValidValue) {
      this.testSetModelValue('16');
    } else {
      this.testSetModelValue('3q4');
    }
  }

  testSetModelValue(valueText) {
    let value = this.modelValue;
    // Test
    let errorText = this.validateParse(valueText);
    // Set
    if (!errorText) {
      value = parseInt(valueText);
      this.modelValue = value;
      this.errorText = '';
    } else {
      this.errorText = errorText;
    }
    // Report
    return !errorText;
  }

  // Validate

  validateParse(value) {
    if (!/^\d+$/.test(value)) {
      return `${value} is not a number`;
    } else {
      return '';
    }
  }
}
