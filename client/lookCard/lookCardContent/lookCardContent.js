/* eslint-disable no-multi-assign */
/* eslint-disable import/no-extraneous-dependencies */
import { el } from 'redom';
import { lookCardGraghic } from './lookCardGrahic/lookCardGraghic';
import { lookCardHistory } from './lookCardHistory/lookCardHistory';
import { lookCardNewTransfer } from './lookCardNewTransfer/lookCardNewTransfer';

export async function lookCardContent() {
  // CREATE
  const graph = await lookCardGraghic();
  const newTransfer = await lookCardNewTransfer();
  const cardHistory = await lookCardHistory();
  const container = el('div.lookCardContent__container', newTransfer, graph, cardHistory);

  return container;
}
