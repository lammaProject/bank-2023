/* eslint-disable import/no-cycle */
/* eslint-disable import/no-extraneous-dependencies */
import { el } from 'redom';
import { profileCard } from './profileCard/profileCard';

export function profile() {
  const card = profileCard();
  const container = el('div.profile__container', card);
  return container;
}
