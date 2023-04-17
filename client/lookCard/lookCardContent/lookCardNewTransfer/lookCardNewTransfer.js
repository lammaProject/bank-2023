/* eslint-disable no-restricted-syntax */
/* eslint-disable array-callback-return */
/* eslint-disable import/no-extraneous-dependencies */
import { el } from 'redom';
import { transferFunds } from '../../../api/transferFunds';
import { bottomIcon } from '../../../assets/svg/bottom';
import { darkMail, mailIcon } from '../../../assets/svg/mail';
import { accountTo, getCardId } from '../../../utils';
import { lookCardGraghic } from '../lookCardGrahic/lookCardGraghic';
import { lookCardHistory } from '../lookCardHistory/lookCardHistory';

export async function lookCardNewTransfer() {
  // CREATE
  const title = el('p.lookCardNewTransfer__title', 'Новый перевод');
  const numberAccountGiver = el('p.lookCardNewTransfer__numAccount', 'Номер счёта получателя');
  const numberAccountDropdown = el('input.lookCardNewTransfer__dropdown', bottomIcon);
  const dropdownAndSvg = el('div.lookCardNewTransfer__dropdown-svg', numberAccountDropdown, bottomIcon);
  const sumTransferTitle = el('p.lookCardNewTransfer__sum-title', 'Сумма перевода');
  const sumTransferInput = el('input.lookCardNewTransfer__sum-input', { type: 'text' });
  const div1 = el('div.lookCardNewTransfer__all-account', numberAccountGiver, dropdownAndSvg);
  const div2 = el('div.lookCardNewTransfer__all-transfer', sumTransferTitle, sumTransferInput);
  const button = el('button.lookCardNewTransfer__btn', mailIcon, 'Отправить');
  const container = el('form.lookCardNewTransfer__container', title, div1, div2, button);
  const array = JSON.parse(localStorage.getItem?.('arrayTo'));
  const nowArray = [];
  // ACTIVE
  function addDrop() {
    function off() {
      bottomIcon.classList.remove('js--icon-active');
      dropdownAndSvg.firstElementChild.remove();
    }
    // OFF
    if (bottomIcon.classList.contains('js--icon-active')) {
      console.log('sss');
      return;
    }
    // ON
    const list = el('ul.lookCardNewTransfer__localList');
    bottomIcon.classList.add('js--icon-active');

    function createItems(arr) {
      arr.map((i) => {
        const item = el('li.lookCardNewTransfer__localName', i);
        // OFF
        item.addEventListener('click', () => {
          numberAccountDropdown.value = item.textContent;
          return off();
        });
        list.append(item);
      });
    }

    if (array !== null) {
      let main = [];
      if (array.length > nowArray.length) {
        main = array;
        for (const i of nowArray) {
          if (!main.some((item) => item === i)) main.push(i);
        }
      } else {
        main = nowArray;
        for (const i of array) {
          if (!main.some((item) => item === i)) main.push(i);
        }
      }
      createItems(main);
    } else {
      createItems(nowArray);
    }

    dropdownAndSvg.prepend(list);
  }

  bottomIcon.addEventListener('click', addDrop);
  numberAccountDropdown.addEventListener('focus', addDrop);
  numberAccountDropdown.addEventListener('input', (e) => {
    if (numberAccountDropdown.value !== '') { e.target.parentElement.parentElement.parentElement.classList.add('card--hover'); }
    if (numberAccountDropdown.value === '' && sumTransferInput.value === '') { e.target.parentElement.parentElement.parentElement.classList.remove('card--hover'); }
  });

  sumTransferInput.addEventListener('input', (e) => {
    const regex = /^[0-9b]*$/;
    const inputText = e.target.value;
    if (sumTransferInput.value !== '') e.target.parentElement.parentElement.classList.add('card--hover');
    if (numberAccountDropdown.value === '' && sumTransferInput.value === '') { e.target.parentElement.parentElement.classList.remove('card--hover'); }
    if (!regex.test(inputText)) {
      e.target.value = inputText.slice(0, -1);
    }
  });

  container.addEventListener('submit', async (event) => {
    event.preventDefault();

    const from = getCardId;
    const to = numberAccountDropdown.value;
    const amount = sumTransferInput.value;
    const cardContent = document.querySelector('.lookCardContent__container');

    if (to !== '' && amount !== '') {
      const res = await transferFunds(from, to, amount);
      const balanceNumber = document.querySelector('.lookCardHeader__balance-number');
      balanceNumber.textContent = String(res.payload.balance);

      if (!nowArray.some((item) => item === to)) nowArray.push(to);

      if (array !== null && array.find((val) => val === to) === to) {
        accountTo();
      } else {
        accountTo(to);
      }

      // MAIL
      button.classList.add('transfer--active');
      button.append(darkMail);
      darkMail.classList.add('mail--active');
      setTimeout(() => {
        darkMail.classList.remove('mail--active');
        darkMail.remove();
      }, 500);
      // UPDATE GRAPH
      const lookGraph = document.querySelector('.lookCardGraph__container');
      const graphContainer = await lookCardGraghic();
      cardContent.append(graphContainer);
      lookGraph.remove();
      // UPDATE HISTORY
      const history = document.querySelector('.lookCardHistory__container');
      const historyContainer = await lookCardHistory();
      cardContent.append(historyContainer);
      history.remove();
    }
  });

  return container;
}
