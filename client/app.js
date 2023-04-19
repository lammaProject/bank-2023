/* eslint-disable import/no-cycle */
/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable import/no-unresolved */
import 'normalize.css';
import './assets/style/main.scss';
import axios from 'axios';
import { el } from 'redom';

import customSelect from 'custom-select';
import { getCardId, alert } from './utils';
// eslint-disable-next-line import/no-extraneous-dependencies
import { header } from './header/header';
import { entry } from './entry/entry';
import { apiUrl } from './url';
import { token } from './api/token';
import { listCard } from './listCard/listCard';
import { lookCard } from './lookCard/loockCard';
import { cardBalance } from './storyCard/cardBalance';
import { cardTransfer } from './cardTransfer/cardTransfer';
import { allValuts } from './valuts/allValuts';
import { bankMap } from './bankMap/bankMap';
import { profile } from './profile/profile';
import { errorApi } from './error/errorApi';
import { removeAccount } from './api/removeAccount';
import { postCurrencyBuy } from './api/postCurrencyBuy';
import { yourValuts } from './valuts/yourValuts/yourValuts';

window.addEventListener('beforeunload', () => {
  const child = document.body.children[1];
  child.classList.add('child--active');
});

export function mainload() {
  const loader = el('svg.loader--profile');
  loader.innerHTML += `
  <svg width="64" height="65" viewBox="0 0 64 65" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="32" cy="32.5" r="31" stroke="#116ACC" stroke-width="2"/>
  <mask id="path-2-inside-1_1_694" fill="white">
    <path d="M64 32.5C64 36.7023 63.1723 40.8635 61.5641 44.7459C59.956 48.6283 57.5989 52.1559 54.6274 55.1274C51.6559 58.0989 48.1283 60.456 44.2459 62.0641C40.3634 63.6723 36.2023 64.5 32 64.5V62.5001C35.9397 62.5001 39.8408 61.7241 43.4805 60.2164C47.1203 58.7088 50.4275 56.499 53.2132 53.7132C55.999 50.9275 58.2088 47.6203 59.7164 43.9805C61.2241 40.3408 62.0001 36.4397 62.0001 32.5H64Z"/>
  </mask>
  <path d="M64 32.5C64 36.7023 63.1723 40.8635 61.5641 44.7459C59.956 48.6283 57.5989 52.1559 54.6274 55.1274C51.6559 58.0989 48.1283 60.456 44.2459 62.0641C40.3634 63.6723 36.2023 64.5 32 64.5V62.5001C35.9397 62.5001 39.8408 61.7241 43.4805 60.2164C47.1203 58.7088 50.4275 56.499 53.2132 53.7132C55.999 50.9275 58.2088 47.6203 59.7164 43.9805C61.2241 40.3408 62.0001 36.4397 62.0001 32.5H64Z" stroke="#B3CEE2" stroke-width="4" mask="url(#path-2-inside-1_1_694)"/>
</svg>
  `;
  loader.style.backgroundColor = 'rgb(24, 34, 51)';
  loader.style.paddingTop = '20px';
  loader.style.paddingBottom = '20px';
  return loader;
}

(async function Main() {
  const windowUrl = document.location.pathname;
  const headerMount = header();

  function renderItems() {
    const child = document.body.children[1];
    child.classList.add('child--render');
    setTimeout(() => {
      child.classList.remove('child--render');
    }, 300);
  }

  // HOVER CARD
  window.addEventListener('mousemove', (event) => {
    const allCard = document.querySelectorAll('.card');

    if (event.target.classList.contains('card__btn')) {
      event.target.parentElement.classList.add('card--hover');
    } else {
      allCard.forEach((e) => { if (e.classList.contains('card--hover')) e.classList.remove('card--hover'); });
    }
  });

  // СОБЫТИЯ МЫШИ
  window.addEventListener('mousedown', (event) => {
    const cardDelete = document.querySelectorAll('.card--delete');
    const btnLock = document.querySelectorAll('.btn--lock');
    const btnDelete = document.querySelectorAll('.listCard__btn--delete');

    function holdFunc(card) {
      let hold = 0;
      const deleteBtn = el('button.listCard__btn--delete', 'Удалить');
      const allBtnNow = document.querySelectorAll('.card__btn');
      const holden = setInterval(() => {
        hold += 1;

        if (hold === 3) {
          card.classList.add('card--delete');
          allBtnNow.forEach((e) => {
            e.classList.add('btn--lock');
          });
          card.lastElementChild.remove();
          card.append(deleteBtn);
          clearInterval(holden);
        }
      }, 100);

      card.addEventListener('mouseup', () => {
        clearInterval(holden);
      });
    }
    // off transfer
    const inputTransfer = document?.querySelector(
      '.lookCardNewTransfer__localList',
    );
    if (
      !event.target.classList.contains('lookCardNewTransfer__localName')
      && inputTransfer
    ) {
      setTimeout(() => {
        const icon = document.querySelector('.js--icon-active');
        icon.classList.remove('js--icon-active');
        inputTransfer.remove();
      }, 100);
    }

    // DELETE CARD
    if (!event.target.classList.contains('card--delete') && !event.target.classList.contains('card') && !event.target.classList.contains('card__account') && !event.target.classList.contains('card__balance') && !event.target.classList.contains('card__lastTrans') && !event.target.classList.contains('listCard__btn--delete')) {
      cardDelete.forEach((e) => {
        e.classList.remove('card--delete');
        const btnCard = el('button.card__btn', 'Открыть');
        btnLock.forEach((ev) => ev.classList.remove('btn--lock'));
        e.lastElementChild.remove();
        e.append(btnCard);
      });
    } else if (event.target.classList.contains('card')) {
      const card = event.target;
      card.addEventListener('mousedown', holdFunc(card));
    }

    if (event.target.classList.contains('card--delete')) {
      const btnCard = el('button.card__btn', 'Открыть');

      event.target.classList.remove('card--delete');
      event.target.lastElementChild.remove();
      event.target.append(btnCard);
      btnCard.classList.add('btn--lock');

      if (cardDelete.length < 2) {
        btnCard.classList.remove('btn--lock');
        btnLock.forEach((e) => e.classList.remove('btn--lock'));
      }
    }

    if (event.target.classList.contains('listCard__btn--delete')) {
      btnDelete.forEach((e) => e.addEventListener('click', () => {
        const id = e.parentElement.firstElementChild.textContent;
        removeAccount(id);
        e.parentElement.remove();
        if (cardDelete.length < 2) btnLock.forEach((ev) => ev.classList.remove('btn--lock'));
      }));
    }

    // get card id
    if (event.target.classList.contains('card__btn')) {
      const cardId = event.target.parentElement.firstElementChild.textContent;
      localStorage.setItem('cardId', JSON.stringify(cardId));
      document.location.pathname = `/account/${cardId}`;
    }
  });

  async function windowEntry() {
    // CREATE
    if (token !== null) document.location.pathname = '/account';
    const {
      card, loginInput, passworlInput, btn,
    } = entry();
    document.body.append(headerMount);
    document.body.append(card);

    // ACTIVE
    btn.addEventListener('click', async () => {
      async function getLogin() {
        const login = await axios.post(`${apiUrl}/login`, {
          login: loginInput.value,
          password: passworlInput.value,
        });

        const data = login;
        return data.data;
      }

      const answer = await getLogin();

      if (answer.error === '') {
        loginInput.parentElement.append(alert('Отлично!', 'success'));
        passworlInput.parentElement.append(alert('Отлично!', 'success'));
        passworlInput.classList.add('entry__input--success');
        loginInput.classList.add('entry__input--success');
        btn.classList.add('btn--lock');
        const tok = answer.payload.token;
        localStorage.setItem('authorization', JSON.stringify(tok));
        localStorage.setItem('profileName', JSON.stringify(loginInput.value));
        document.location.pathname = '/account';
      } else {
        switch (answer.error) {
          case 'No such user':
            loginInput.parentElement.append(alert('Неправильный логин', 'warning'));
            loginInput.classList.add('entry__input--error');
            break;
          case 'Invalid password':
            passworlInput.parentElement.append(alert('Неправильный пароль', 'warning'));
            passworlInput.classList.add('entry__input--error');
            break;
          default:
            loginInput.parentElement.append(alert('Неправильный логин', 'warning'));
            passworlInput.parentElement.append(alert('Неправильный пароль', 'warning'));
            loginInput.classList.add('entry__input--error');
            passworlInput.classList.add('entry__input--error');
            break;
        }

        btn.classList.add('btn--lock');
      }
    });
  }

  function windowProfile() {
    if (token === null) document.location.pathname = '/';
    // CREATE
    document.body.append(headerMount);
    document.body.append(profile());
  }

  async function windowListCard() {
    if (token === null) document.location.pathname = '/';
    // CREATE
    document.body.append(mainload());
    document.body.append(headerMount);
    document.body.append(await listCard().then((res) => { document.body.firstElementChild.remove(); return res; }));
    renderItems();
    customSelect('select');
  }

  async function windowLookcard() {
    if (token === null) document.location.pathname = '/';
    // CREATE
    document.body.append(mainload());
    document.body.append(headerMount);
    document.body.append(await lookCard().then((res) => { document.body.firstElementChild.remove(); return res; }));
    renderItems();
  }

  async function windowStoryBalance() {
    if (token === null) document.location.pathname = '/';
    // CREATE
    document.body.append(mainload());
    document.body.append(headerMount);
    document.body.append(await cardBalance().then((res) => { document.body.firstElementChild.remove(); return res; }));
  }

  async function windowStoryTransfer() {
    if (token === null) document.location.pathname = '/';
    // create
    document.body.append(mainload());
    document.body.append(headerMount);
    document.body.append(await cardTransfer().then((res) => { document.body.firstElementChild.remove(); return res; }));
  }

  async function windowValuts() {
    if (token === null) document.location.pathname = '/';
    // create
    document.body.append(mainload());
    document.body.append(headerMount);
    document.body.append(await allValuts().then((res) => { document.body.firstElementChild.remove(); return res; }));
    customSelect('select');

    // ERROR CHECK
    const button = document.querySelector('.transferValuts__button');
    const from = document.querySelector('.transferValuts__from');
    const to = document.querySelector('.transferValuts__to');
    const sum = document.querySelector('.transferValuts__sum');
    const isOpen = document.querySelectorAll('.custom-select-opener');
    const warning = alert('Одинаковые валюты', 'warning');
    const warningSum = alert('Вы не ввели сумму', 'warning');
    const overDraft = alert('недостаточно средств', 'warning');

    function removeError(e) {
      const warningAll = document.querySelectorAll('.warningMain');

      if (e.classList.contains('valutBorder--error')) {
        from.previousElementSibling.classList.remove('valutBorder--error');
        to.previousElementSibling.classList.remove('valutBorder--error');
        warning.remove();
      }
      if (warningAll.length < 2) {
        button.classList.remove('btn--lock');
      }
    }

    isOpen.forEach((e) => e.addEventListener('click', () => removeError(e)));

    sum.addEventListener('input', () => {
      const warningAll = document.querySelectorAll('.warningMain');
      if (sum.classList.contains('valutBorder--error')) {
        sum.classList.remove('valutBorder--error');
        warningSum.remove();
        overDraft.remove();
      }

      if (warningAll.length < 1) {
        button.classList.remove('btn--lock');
      }
    });

    button.addEventListener('click', async () => {
      if (from.value === to.value) {
        const upError = document.querySelector('.transferValuts__up');

        from.previousElementSibling.classList.add('valutBorder--error');
        to.previousElementSibling.classList.add('valutBorder--error');

        warning.classList.add('valut--warning');
        upError.prepend(warning);
        button.classList.add('btn--lock');
      }

      if (sum.value === '') {
        sum.classList.add('valutBorder--error');
        warningSum.classList.add('valut--warning');
        sum.parentElement.prepend(warningSum);
        button.classList.add('btn--lock');
      }

      if (from.value !== to.value && sum.value !== '') {
        const date = await postCurrencyBuy(from.value, to.value, Number(sum.value));
        if (date.error === 'Overdraft prevented') {
          sum.classList.add('valutBorder--error');
          overDraft.classList.add('valut--warning');
          sum.parentElement.prepend(overDraft);
          button.classList.add('btn--lock');
          return;
        }

        const yourVal = document.querySelector('.yourValuts__container');
        const middleLeft = document.querySelector('.allValuts__middle');
        const newYour = await yourValuts(from.value, to.value);
        yourVal.remove();
        middleLeft.prepend(newYour);
      }
    });
  }

  async function windowMap() {
    if (token === null) document.location.pathname = '/';
    // create
    document.body.append(mainload());
    document.body.append(headerMount);
    document.body.append(await bankMap().then((res) => { document.body.firstElementChild.remove(); return res; }));
    if (document.body.firstElementChild.className === 'bankMap__container') {
      document.body.innerHTML = '';
      document.body.append(errorApi());
    }
  }

  // ROUTE
  switch (windowUrl) {
    case '/':
      windowEntry();
      break;
    case '/profile':
      windowProfile();
      break;
    case '/account':
      windowListCard();
      break;
    case `/account/${getCardId}`:
      windowLookcard();
      break;
    case `/account/${getCardId}/balance`:
      windowStoryBalance();
      break;
    case `/account/${getCardId}/history-transfer`:
      windowStoryTransfer();
      break;
    case '/account/valuts':
      windowValuts();
      break;
    case '/account/map':
      windowMap();
      break;
    default:
      windowEntry();
      break;
  }
}());
