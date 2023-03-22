/* eslint-disable import/no-extraneous-dependencies */
import { el } from 'redom';
import { getCardId } from '../utils';
import { lookCardHeader } from '../lookCard/lookCardHeader/lookCardHeader';
import { lookCardHistory } from '../lookCard/lookCardContent/lookCardHistory/lookCardHistory';
import { dynamicBalance } from './dynamicBalance/dynamicBalance';
import { variableTrans } from './variableTrans/variableTrans';

export async function cardBalance() {
  const header = await lookCardHeader('История баланса', `account/${getCardId}`);
  const dynamic = await dynamicBalance();
  const variable = await variableTrans();
  const transferStory = await lookCardHistory();
  const container = el('section.CardBalance__container', header, dynamic, variable, transferStory);
  return container;
}
