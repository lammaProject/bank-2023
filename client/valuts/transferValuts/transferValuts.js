/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
import { el } from 'redom';
import { getAllCurriences } from '../../api/getAllCurriences';
import { postCurrencyBuy } from '../../api/postCurrencyBuy';
import { yourValuts } from '../yourValuts/yourValuts';
// import { bottomIconSvg } from '../../assets/svg/bottom';

export async function transferValuts() {
  // CREATE
  const h1 = el('h1.transferValuts__title', 'Обмен валюты');
  const from = el('select.transferValuts__from');
  const fromText = el('p.transferValuts__text', 'Из');
  const toText = el('p.transferValuts__text', 'в');
  const sumText = el('p.transferValuts__text', 'Сумма');
  const to = el('select.transferValuts__to', 'bottomIcon');
  const sum = el('input.transferValuts__sum');
  const button = el('button.transferValuts__button', 'Обменять');
  const fromDiv = el('div.transferValuts__fromDiv', fromText, from);
  const toDiv = el('div.transferValuts__toDiv', to);
  const sumDiv = el('div.transferValuts__sumDiv', sumText, sum);
  const div1 = el('div.transferValuts__up', fromDiv, toText, toDiv);
  const div2 = el('div.transferValuts__bottom', sumDiv);
  const div1di2 = el('div.transferValuts__left', div1, div2);
  const form = el('form.transferValuts__form', div1di2, button);
  const container = el('div.transferValuts__container', h1, form);

  // ACTION
  const { payload } = await getAllCurriences();
  for (const i of payload) {
    const optionTo = el('option.transferValuts__option', { value: i }, i);
    const optionFrom = el('option.transferValuts__option', { value: i }, i);
    from.append(optionFrom);
    to.append(optionTo);
  }
  sum.addEventListener('input', (e) => {
    const regex = /^[0-9b]*$/;
    const inputText = e.target.value;
    if (!regex.test(inputText)) {
      e.target.value = inputText.slice(0, -1);
    }
  });

  form.addEventListener('submit', (ev) => ev.preventDefault());
  button.addEventListener('click', async () => {
    const dat = await postCurrencyBuy(from.value, to.value, Number(sum.value));
    const yourVal = document.querySelector('.yourValuts__container');
    const middleLeft = document.querySelector('.allValuts__middle');
    const newYour = await yourValuts(from.value, to.value);
    yourVal.remove();
    middleLeft.prepend(newYour);

    console.log(yourVal);
    console.log(dat);
  });
  console.log(payload);

  return container;
}
