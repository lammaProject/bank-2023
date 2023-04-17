/* eslint-disable consistent-return */
/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/no-extraneous-dependencies
import { el } from 'redom';
import { getAccount } from '../api/getAccounts';
// eslint-disable-next-line import/no-cycle
import { listCardNav } from './listCardNav/listCardNav';

export async function listCard() {
  const accounts = await getAccount();
  const cardList = el('ul.listCard-cardList');

  accounts?.payload.forEach((item) => {
    const account = el('h2.card__account', item.account);
    const balance = el('p.card__balance', item.balance);
    const btnCard = el('button.card__btn', 'Открыть');
    const card = el('li.card', account, balance, { id: item.account, balance: item.balance });

    btnCard.addEventListener('mousemove', (e) => {
      e.target.parentElement.classList.add('card--hover');
    });

    btnCard.addEventListener('mouseleave', (e) => {
      e.target.parentElement.classList.remove('card--hover');
    });

    if (item.transactions.length > 0) {
      const date = new Date(item?.transactions[0].date);
      const monthName = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
      const lastTrans = el('div.card__lastTrans', 'Последняя транзация: ', el('p.card__lastTrans-text', `${date.getDate()} ${monthName[date.getMonth()]} ${date.getFullYear()}`));
      card.setAttribute('date', item?.transactions[0].date);
      card.append(lastTrans);
      card.append(btnCard);
      return cardList.append(card);
    }

    card.append(btnCard);
    cardList.append(card);
  });

  const mainDiv = el('div.listCard__main', listCardNav(), cardList);
  return mainDiv;
}
