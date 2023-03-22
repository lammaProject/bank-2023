/* eslint-disable import/no-extraneous-dependencies */
import { el } from 'redom';
import { nowTimeValuts } from './yourValuts/nowTimeValuts/nowTimeValuts';
import { yourValuts } from './yourValuts/yourValuts';

export async function allValuts() {
  const your = await yourValuts();
  const nowTime = await nowTimeValuts();
  const h1 = el('h1.allValue__title', 'Валютный обмен');
  const div = el('div.allValuts__middle', your, nowTime);
  const container = el('section.allValuts__section', h1, div);
  return container;
}
