/* eslint-disable import/no-extraneous-dependencies */
import { el } from 'redom';
import { getAccountId } from '../../api/getAccountId';
import { backIcon } from '../../assets/svg/back';

export async function lookCardHeader(titleName = 'Просмотр счёта', location = '/account') {
  const lookCard = await getAccountId();
  console.log(lookCard);
  const h1 = el('h1.lookCardHeader__title', titleName);
  const btnBack = el('button.lookCardHeader__btn', 'Вернуться назад', backIcon);
  btnBack.addEventListener('click', () => {
    // window.location.pathname = location;
    history.back();
  });
  const divTop = el('div.lookCardHeader__top', h1, btnBack);
  const numAcc = el('p.lookCardHeader__id', `№ ${lookCard.payload.account}`);
  const balance = el('div.lookCardHeader__balance', el('p.lookCardHeader__balance-text', 'Баланс'), el('p.lookCardHeader__balance-number', `${lookCard.payload.balance}`));
  const divBottom = el('div.lookCardHeader__bottom', numAcc, balance);
  const container = el('div.lookCardHeader__all', divTop, divBottom);
  return container;
}
