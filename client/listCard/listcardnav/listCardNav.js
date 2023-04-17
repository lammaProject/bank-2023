/* eslint-disable no-fallthrough */
/* eslint-disable no-plusplus */
// eslint-disable-next-line import/no-extraneous-dependencies
import { el } from 'redom';
import { createAccount } from '../../api/createAccount';
import { plus } from '../../assets/svg/plus';

export function listCardNav() {
  const title = el('h1.listCard-nav__title', 'Ваши счета');
  const sort = el('select.listCard-dropdown', el('option', 'Сортировка', {
    value: '', selected: 'selected', disabled: 'disabled', hidden: 'hidden',
  }), el('option.listCard-dropdown__option', 'По номеру', { value: 'number' }), el('option.listCard-dropdown__option', 'По балансу', { value: 'balance' }), el('option.listCard-dropdown__option', 'По последней транзакции', { value: 'tranz' }));
  const icon = el('svg.listCard-nav__svg');
  icon.innerHTML += plus;

  sort.addEventListener('change', (event) => {
    const cardList = document.querySelector('.listCard-cardList');
    const allCard = document.querySelectorAll('.card');
    const sortArr = [];

    allCard.forEach((item) => {
      const date = item.getAttribute('date') === null ? 0 : Date.parse(item.getAttribute('date'));
      // console.log(Date.parse(item.getAttribute('date')));
      sortArr.push({ balance: Number(item.getAttribute('balance')), id: item.getAttribute('id'), date });
    });

    switch (event.target.value) {
      case 'balance': sortArr.sort((a, b) => b.balance - a.balance);
        break;
      case 'number': sortArr.sort((a, b) => b.id - a.id);
        break;
      case 'tranz': sortArr.sort((a, b) => b.date - a.date);
      default:
        break;
    }

    for (let i = 0; i < sortArr.length; i++) {
      const ch = cardList.children[i].getAttribute('id');
      console.log(sortArr);
      if (ch === sortArr[0].id) {
        cardList.append(cardList.children[i]);
        sortArr.shift();
        i = -1;
      }
    }
  });

  const btnCreate = el('button.listCard-btn', 'Создать новый счет', icon);
  btnCreate.addEventListener('click', async () => {
    const account = await createAccount();
    const cardList = document.querySelector('.listCard-cardList');
    async function createCard() {
      const cardAc = el('h2.card__account', account.payload.account);
      const balance = el('p.card__balance', account.payload.balance);
      const btnCard = el('button.card__btn', 'Открыть');
      const card = el('li.card', cardAc, balance, btnCard);
      cardList.append(card);
    }

    await createCard();
  });

  const navHeader = el('div.listCard-nav__header', title, sort, btnCreate);
  return navHeader;
}
