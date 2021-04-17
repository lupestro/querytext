import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

const EXPECTED_RESULT = `Model Value: 15
  Something went wrong`;

module('Integration | Component | model-display', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(
      hbs`<ModelDisplay @value="15" @error="Something went wrong" />`
    );

    assert.equal(this.element.textContent.trim(), EXPECTED_RESULT);

    // Template block usage:
    await render(hbs`
      <ModelDisplay @value="15" @error="Something went wrong" >
        template block text
      </ModelDisplay>
    `);

    assert.equal(this.element.textContent.trim(), EXPECTED_RESULT);
  });
});
