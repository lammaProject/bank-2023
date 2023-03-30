/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable import/no-unresolved */
import 'normalize.css';
import './assets/style/main.scss';
import axios from 'axios';
import { getCardId } from './utils';
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

window.addEventListener('beforeunload', () => {
  const head = document.querySelector('.header_nav');
  const child = document.body.children[1];
  child.classList.add('child--active');
  head.classList.add('header--active');
});

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

  window.addEventListener('mousedown', (event) => {
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
    // get card id
    if (event.target.classList.contains('card__btn')) {
      const cardId = event.target.parentElement.firstElementChild.textContent;
      localStorage.setItem('cardId', JSON.stringify(cardId));
      document.location.pathname = `/account/${cardId}`;
    }
  });

  async function windowEntry() {
    // CREATE
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
        const tok = answer.payload.token;
        localStorage.setItem('authorization', JSON.stringify(tok));
        document.location.pathname = '/account';
      }
    });
  }

  async function windowListCard() {
    if (token === null) document.location.pathname = '/';
    // CREATE
    document.body.append(headerMount);
    document.body.append(await listCard());
    renderItems();
  }

  async function windowLookcard() {
    if (token === null) document.location.pathname = '/';
    // CREATE
    document.body.append(headerMount);
    document.body.append(await lookCard());
    renderItems();
  }

  async function windowStoryBalance() {
    if (token === null) document.location.pathname = '/';
    // CREATE
    document.body.append(headerMount);
    document.body.append(await cardBalance());
  }

  async function windowStoryTransfer() {
    if (token === null) document.location.pathname = '/';
    // create
    document.body.append(headerMount);
    document.body.append(await cardTransfer());
  }

  async function windowValuts() {
    if (token === null) document.location.pathname = '/';
    // create
    document.body.append(headerMount);
    document.body.append(await allValuts());
  }

  // ROUTE
  switch (windowUrl) {
    case '/':
      windowEntry();
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
    default:
      windowEntry();
      break;
  }
}());
