// eslint-disable-next-line import/no-extraneous-dependencies
import { el } from 'redom';
import { logo } from '../assets/svg/logo';
import { getCardId } from '../utils';
import { apiUrl } from '../url';

export async function getImg() {
  const create = await fetch(`${apiUrl}/profileImgGet`);
  const res = await create.json();
  console.log(res);
  return res;
}

export function header() {
  // const dateImg = JSON.parse(localStorage.getItem('profileImg'));
  const divProfile = el('div.header__divProfile');
  getImg().then((res) => {
    const profileImg = el('img.header__profileImg', { src: res.payload.src, style: { transform: `scale(${res.payload.transform})`, left: `${res.payload.left}%` } });
    divProfile.append(profileImg);
  });
  const windowUrl = document.location.pathname;
  const svgLogo = el('div.header_logo');
  svgLogo.innerHTML = logo;
  svgLogo.addEventListener('click', () => {
    document.location.pathname = '/profile';
  });
  const headerNav = el('header.header_nav', svgLogo);

  const btnATM = el('button.header-btn', 'Банкоматы');
  btnATM.addEventListener('click', () => {
    document.location.pathname = '/account/map';
  });
  const btnAccounts = el('button.header-btn', 'Счета');
  btnAccounts.addEventListener('click', () => {
    document.location.pathname = '/account';
  });
  const btnValuts = el('button.header-btn', 'Валюта');
  btnValuts.addEventListener('click', () => {
    document.location.pathname = '/account/valuts';
  });
  const btnExit = el('button.header-btn', 'Выйти');
  btnExit.addEventListener('click', () => {
    localStorage.clear();
    document.location.pathname = '/';
  });

  let allBtn = el('div.header__all-btn', divProfile, btnATM, btnAccounts, btnValuts, btnExit);

  switch (windowUrl) {
    case '/':
      allBtn = '';
      break;
    case '/account':
      btnAccounts.style.backgroundColor = '#A0C3FF';
      btnAccounts.style.cursor = 'default';
      btnAccounts.setAttribute('disabled', 'disabled');
      break;
    case `/account/${getCardId}`:
      break;
    case `/account/${getCardId}/balance`:
      break;
    case `/account/${getCardId}/history-transfer`:
      break;
    case '/account/valuts':
      btnValuts.style.backgroundColor = '#A0C3FF';
      btnValuts.style.cursor = 'default';
      btnValuts.setAttribute('disabled', 'disabled');
      break;
    case '/account/map':
      btnATM.style.backgroundColor = '#A0C3FF';
      btnATM.style.cursor = 'default';
      btnATM.setAttribute('disabled', 'disabled');
      break;
    default:
      break;
  }

  headerNav.append(allBtn);
  return (headerNav);
}
