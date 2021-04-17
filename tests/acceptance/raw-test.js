import { module, test } from 'qunit';
import { visit, currentURL, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | raw test', function (hooks) {
  setupApplicationTest(hooks);

  let testWithValid = function (assert, value) {
    const href = new RegExp(`.*/raw\\?text=${value}$`);
    assert.dom('.input-area a').hasAttribute('href', href);
    assert.dom('#queryval').hasText(value);
    assert.dom('#formval').hasText(value);
    assert.dom('.value').hasText(value);
    assert.dom('.error').hasText('');
  };

  let testWithInvalid = function (assert, value, priorValue) {
    const href = new RegExp(`.*/raw\\?text=${value}$`);
    assert.dom('.input-area a').hasAttribute('href', href);
    assert.dom('#queryval').hasText(priorValue);
    assert.dom('#formval').hasText(priorValue);
    assert.dom('.value').hasText(priorValue);
    assert.dom('.error').hasText(`Value ${value} is out of range`);
  };
  test('visiting /raw with no query text', async function (assert) {
    await visit('/raw');

    assert.equal(currentURL(), '/raw');
    testWithValid(assert, '5');
  });
  test('visiting /raw with valid query text', async function (assert) {
    await visit('/raw?text=14');

    assert.equal(currentURL(), '/raw?text=14');
    testWithValid(assert, '14');
  });
  test('visiting /raw with invalid query text', async function (assert) {
    await visit('/raw?text=24');

    assert.equal(currentURL(), '/raw?text=24');
    testWithInvalid(assert, '24', '12');
  });
  test('visiting /raw and filling form with valid text', async function (assert) {
    await visit('/raw');
    await fillIn('#formval', '18');
    testWithValid(assert, '18');
  });
  test('visiting /raw and filling form with invalid text', async function (assert) {
    await visit('/raw');
    await fillIn('#formval', '22');
    testWithInvalid(assert, '22', '5');
  });
  test('visiting /raw and setting query value with valid text', async function (assert) {
    await visit('/raw');
    await fillIn('#queryval', '18');
    const href = new RegExp(`.*/raw\\?text=18$`);
    assert.dom('.input-area a').hasAttribute('href', href);
    assert.dom('#formval').hasText('5');
    assert.dom('.value').hasText('5');
    assert.dom('.error').hasText('');
  });
  test('visiting /raw and setting query value with invalid text', async function (assert) {
    await visit('/raw');
    await fillIn('#queryval', '29');
    const href = new RegExp(`.*/raw\\?text=29$`);
    assert.dom('.input-area a').hasAttribute('href', href);
    assert.dom('#formval').hasText('5');
    assert.dom('.value').hasText('5');
    assert.dom('.error').hasText('');
  });
});
