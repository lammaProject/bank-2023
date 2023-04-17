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
import { bankMap } from './bankMap/bankMap';
import { profile } from './profile/profile';
import { errorApi } from './error/errorApi';

window.addEventListener('beforeunload', () => {
  const child = document.body.children[1];
  child.classList.add('child--active');
});

export function alert(name, status) {
  if (status === 'warning') {
    const warnIcon = el('svg.icon--warning');
    warnIcon.innerHTML += `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_1_901)">
    <path d="M12 3.94365L22.2338 21L1.76619 21L12 3.94365Z" fill="#BA0000" stroke="#BA0000" stroke-width="2"/>
    <path d="M12 10L12 15M12 18L12 16.5" stroke="white" stroke-width="2"/>
    </g>
    <defs>
    <clipPath id="clip0_1_901">
    <rect width="24" height="24" fill="white"/>
    </clipPath>
    </defs>
    </svg>
    
    `;
    const text = el('p.text-warning', name);
    const war = el('div.warningMain', warnIcon, text);
    return war;
  }

  if (status === 'success') {
    const successIcon = el('svg.icon--success');
    successIcon.innerHTML += `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C6.47967 21.994 2.00606 17.5204 2 12V11.8C2.10993 6.30455 6.63459 1.92797 12.1307 2.0009C17.6268 2.07382 22.0337 6.5689 21.9978 12.0654C21.9619 17.5618 17.4966 21.9989 12 22ZM7.41 11.59L6 13L10 17L18 9.00002L16.59 7.58002L10 14.17L7.41 11.59Z" fill="#76CA66"/>
    </svg>
    `;

    const text = el('p.text--success', name);
    const suc = el('div.successMain', successIcon, text);
    return suc;
  }
}

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
