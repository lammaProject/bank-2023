// eslint-disable-next-line import/no-extraneous-dependencies
import { el } from 'redom';
import { logo } from '../assets/svg/logo';
import { getCardId } from '../utils';

export function header() {
  const windowUrl = document.location.pathname;
  const svgLogo = el('div.header_logo');
  svgLogo.innerHTML = logo;
  const headerNav = el('header.header_nav', svgLogo);

  const btnATM = el('button.header-btn', 'Банкоматы');
  const btnAccounts = el('button.header-btn', 'Счета');
  const btnValuts = el('button.header-btn', 'Валюта');
  const btnExit = el('button.header-btn', 'Выйти');
  const allBtn = el('div.header__all-btn', btnATM, btnAccounts, btnValuts, btnExit);

  switch (windowUrl) {
    case '/account':
      btnAccounts.style.backgroundColor = '#A0C3FF';
      headerNav.append(allBtn);
      break;
    case `/account/${getCardId}`:
      headerNav.append(allBtn);
      break;
    case `/account/${getCardId}/balance`:
      headerNav.append(allBtn);
      break;
    case `/account/${getCardId}/history-transfer`:
      headerNav.append(allBtn);
      break;
    default:
      break;
  }
  return (headerNav);
}
