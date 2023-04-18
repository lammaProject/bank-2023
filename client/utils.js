/* eslint-disable import/no-extraneous-dependencies */
import { el } from 'redom';

export const getCardId = JSON.parse(localStorage.getItem('cardId'));
export const arrAccounts = [];
export function accountTo(to) {
  let jsonArray;

  if (to === undefined) return;
  if (JSON.parse(localStorage.getItem('arrayTo') !== null)) {
    const array = JSON.parse(localStorage.getItem('arrayTo'));
    // if (array[0] === to) return;
    if (array.some((u) => u === to)) return;
    array.push(to);
    jsonArray = array;
  } else {
    arrAccounts.push(to);
    jsonArray = arrAccounts;
  }

  localStorage.setItem('arrayTo', JSON.stringify(jsonArray));
}

export const monthName = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];

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
