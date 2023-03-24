/* eslint-disable import/no-extraneous-dependencies */
import { el } from 'redom';
import { bottomIcon } from '../../assets/svg/bottom';

export async function transferValuts() {
  const h1 = el('h1.transferValuts__title', 'Обмен валюты');
  const from = el('input.transferValuts__from', bottomIcon);
  const fromText = el('p.transferValuts__text', 'Из');
  const toText = el('p.transferValuts__text', 'в');
  const sumText = el('p.transferValuts__text', 'Сумма');
  const to = el('input.transferValuts__to', bottomIcon);
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
  return container;
}
