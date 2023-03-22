/* eslint-disable import/no-extraneous-dependencies */
import { el } from 'redom';
import { lookCardContent } from './lookCardContent/lookCardContent';
import { lookCardHeader } from './lookCardHeader/lookCardHeader';

export async function lookCard() {
  const cardHeader = await lookCardHeader();
  const cardContent = await lookCardContent();
  const allLookCard = el('section.lookCard__all', cardHeader, cardContent);
  return allLookCard;
}
