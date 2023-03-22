/* eslint-disable no-plusplus */
/* eslint-disable import/no-extraneous-dependencies */
import { el } from 'redom';
import { getAccountId } from '../../../api/getAccountId';
import { getCardId } from '../../../utils';

export async function lookCardHistory(val = '10') {
  // CREATE
  const history = await getAccountId().then((res) => res.payload.transactions);
  const title = el('h2.lookCardHistory__title', 'История переводов');
  const table = el('table.lookCardHistory__table', el('tr.table-header', el('th.lookCardhistory__table-th', 'Счёт отправителя'), el('th.lookCardhistory__table-th', 'Счёт получателя'), el('th.lookCardhistory__table-th', 'Сумма'), el('th.lookCardhistory__table-th', 'Дата')));
  const container = el('div.lookCardHistory__container', title, table);
  let count = val;
  if (history.length < 10) count = history.length;
  if (history.length < 1) {
    title.textContent = 'У вас еще не было переводов';
    table.remove();
    return container;
  }
  for (let i = 0; i < count; i++) {
    const item = history.pop();
    let plusOrMinus = '-';
    let amountClass = 'minus';
    if (getCardId === item.to) { plusOrMinus = '+'; amountClass = 'plus'; }
    const amount = el(`td.lookCardHistory__item.${amountClass}`, plusOrMinus + item.amount);
    const date = new Date(item.date);
    const from = item.from.slice(0, 11);
    const to = item.to.slice(0, 11);
    const th = el('tr.lookCardHistory__tr', el('td.lookCardHistory__item', from), el('td.lookCardHistory__item', to), amount, el('td.lookCardHistory__item', `${date.getDate() > 9 ? date.getDate() : `${0}${date.getDate()}`}.${date.getMonth() > 9 ? date.getMonth() + 1 : `${0}${date.getMonth() + 1}`}.${date.getFullYear()}`));
    table.append(th);
  }

  // ACTIVE
  container.addEventListener('click', () => {
    if (history.length > 0) window.location.pathname = `/account/${getCardId}/history-transfer`;
  });
  return container;
}
