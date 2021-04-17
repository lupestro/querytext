import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | form-input', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    this.contents = { inputText: '15' };
    await render(hbs`<FormInput @contents={{this.contents}} />`);

    assert.equal(
      this.element.textContent.trim(),
      'Enter a number between 1 and 20:'
    );

    // Template block usage: block ignored
    await render(hbs`
      <FormInput @contents={{this.contents}}>
        template block text
      </FormInput>
    `);

    assert.equal(
      this.element.textContent.trim(),
      'Enter a number between 1 and 20:'
    );
  });
});
