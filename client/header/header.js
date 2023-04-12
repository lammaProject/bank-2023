/* eslint-disable import/no-cycle */
/* eslint-disable consistent-return */
// eslint-disable-next-line import/no-extraneous-dependencies
import { el } from 'redom';
import { logo } from '../assets/svg/logo';
import { getCardId } from '../utils';
import { apiUrl } from '../url';
import { token } from '../api/token';
import { getAccount } from '../api/getAccounts';
import { errorApi } from '../error/errorApi';

function load() {
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
  return loader;
}

export async function getImg() {
  try {
    const create = await fetch(`${apiUrl}/profileImgGet`);
    const res = await create.json();
    return res;
  } catch (err) {
    console.log(err, 'getImg');
    document.body.innerHTML = '';
    document.body.append(errorApi());
  }
}

export function header() {
  const divProfile = el('div.header__divProfile');
  const divDivProfile = el('div.header__divDivProfile', load());
  divDivProfile.addEventListener('click', () => { document.location.pathname = '/profile'; });
  getImg().then(async (res) => {
    if (res.payload !== null && token !== null) {
      const acc = await getAccount();
      console.log(res);
      const srcImg = Buffer.from(res.payload.src).toString();
      const hi = el('p.header__hi', `${JSON.parse(localStorage.getItem('profileName'))}`);
      const nameProfile = el('p.header__profileName', `Открыто: ${acc.payload.length} счёта`);
      const dateProfile = el('div.header__profiledate', hi, nameProfile);
      const profileImg = el('img.header__profileImg', { src: srcImg, style: { transform: `scale(${res.payload.transform})`, left: `${res.payload.left}`, top: `${res.payload.top}` } });
      divProfile.append(profileImg);
      divDivProfile.lastElementChild.remove();
      divDivProfile.append(divProfile);
      divDivProfile.append(dateProfile);
    }
  });
  const windowUrl = document.location.pathname;
  const svgLogo = el('div.header_logo');
  svgLogo.innerHTML = logo;
  svgLogo.addEventListener('click', () => {
    document.location.pathname = '/account';
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

  let allBtn = el('div.header__all-btn', btnATM, btnAccounts, btnValuts, btnExit);

  switch (windowUrl) {
    case '/':
      allBtn = '';
      break;
    case '/profile':
      divDivProfile.style.backgroundColor = '#182233';
      divDivProfile.style.color = 'white';
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
  if (token !== null) headerNav.append(divDivProfile);
  headerNav.append(allBtn);
  return (headerNav);
}
