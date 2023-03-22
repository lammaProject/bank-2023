/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
import { el } from 'redom';
import { getCurrencies } from '../../api/getCurrencies';

export async function yourValuts() {
  const h1 = el('h1.yourValuts__title', 'Ваши валюты');
  const { payload } = await getCurrencies();
  const ul = el('ul.yourValuts__ul');

  for (const key in payload) {
    const val = payload[key];
    const nameVal = el('p.yourValuts__nameVal', val.code);
    const amoutVal = el('p.yourValuts__amountVal', String(val.amount));
    const line = el('p.yourValuts__line');
    const li = el('li.yourValuts__lit', nameVal, line, amoutVal);
    ul.append(li);
  }

  const container = el('div.yourValuts__container', h1, ul);
  return container;
}
