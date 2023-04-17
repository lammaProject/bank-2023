/* eslint-disable import/no-extraneous-dependencies */
import { el } from 'redom';
import { transferValuts } from './transferValuts/transferValuts';
import { yourValuts } from './yourValuts/yourValuts';
import { nowTimeValuts } from './nowTimeValuts/nowTimeValuts';

export async function allValuts() {
  const your = await yourValuts();
  const nowTime = await nowTimeValuts();
  const transferVal = await transferValuts();
  const h1 = el('h1.allValue__title', 'Валютный обмен');
  const div = el('div.allValuts__middle', your, transferVal);
  const middleValuts = el('div.allValuts__middleAll', div, nowTime);
  const container = el('section.allValuts__section', h1, middleValuts);

  return container;
}
