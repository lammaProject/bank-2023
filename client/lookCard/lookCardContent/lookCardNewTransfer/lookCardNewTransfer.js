/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-cycle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable array-callback-return */
/* eslint-disable import/no-extraneous-dependencies */
import { el } from 'redom';
import { transferFunds } from '../../../api/transferFunds';
import { bottomIcon } from '../../../assets/svg/bottom';
import { darkMail, mailIcon } from '../../../assets/svg/mail';
import { accountTo, getCardId, alert } from '../../../utils';
import { lookCardGraghic } from '../lookCardGrahic/lookCardGraghic';
import { lookCardHistory } from '../lookCardHistory/lookCardHistory';

export async function lookCardNewTransfer() {
  // CREATE
  const title = el('p.lookCardNewTransfer__title', 'Новый перевод');
  const numberAccountGiver = el('p.lookCardNewTransfer__numAccount', 'Номер счёта получателя');
  const numberAccountDropdown = el('input.lookCardNewTransfer__dropdown', bottomIcon);
  numberAccountDropdown.value = '61253747452820828268825011';
  const dropdownAndSvg = el('div.lookCardNewTransfer__dropdown-svg', numberAccountDropdown, bottomIcon);
  const sumTransferTitle = el('p.lookCardNewTransfer__sum-title', 'Сумма перевода');
  const sumTransferInput = el('input.lookCardNewTransfer__sum-input', { type: 'text' });
  const div1 = el('div.lookCardNewTransfer__all-account', numberAccountGiver, dropdownAndSvg);
  const div2 = el('div.lookCardNewTransfer__all-transfer', sumTransferTitle, sumTransferInput);
  const button = el('button.lookCardNewTransfer__btn', mailIcon, 'Отправить');
  button.classList.add('btn--lock');
  const container = el('form.lookCardNewTransfer__container', title, div1, div2, button);
  const array = JSON.parse(localStorage.getItem?.('arrayTo'));
  const nowArray = [];
  const warning = alert('Недостаточно средств', 'warning');
  // ACTIVE
  function addDrop() {
    function off() {
      bottomIcon.classList.remove('js--icon-active');
      dropdownAndSvg.firstElementChild.remove();
    }
    // OFF
    if (bottomIcon.classList.contains('js--icon-active')) {
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

  function checkValue() {
    if (sumTransferInput.value !== '' || numberAccountDropdown.value !== '') container.classList.add('card--hover');
    if (sumTransferInput.value === '' || numberAccountDropdown.value === '') button.classList.add('btn--lock');
    if (sumTransferInput.value !== '' && numberAccountDropdown.value !== '') { button.classList.remove('btn--lock'); container.classList.add('card--hover'); }
    if (numberAccountDropdown.value === '' && sumTransferInput.value === '') { container.classList.remove('card--hover'); button.classList.add('btn--lock'); }
  }

  bottomIcon.addEventListener('click', addDrop);
  numberAccountDropdown.addEventListener('focus', addDrop);
  numberAccountDropdown.addEventListener('input', () => {
    checkValue();
  });

  sumTransferInput.addEventListener('input', (e) => {
    const regex = /^[0-9b.]*$/;
    const inputText = e.target.value;
    checkValue();
    if (sumTransferInput.classList.contains('valutBorder--error')) {
      button.classList.remove('btn--lock');
      sumTransferInput.classList.remove('valutBorder--error');
      warning.remove();
    }

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
    const res = await transferFunds(from, to, amount);

    if (res.error === 'Overdraft prevented') {
      warning.classList.add('lookCardNewTransfer__error');
      div2.append(warning);
      sumTransferInput.classList.add('valutBorder--error');
      button.classList.add('btn--lock');
      return;
    }
    console.log(res);
    if (to !== '' && amount !== '') {
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
