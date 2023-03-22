/* eslint-disable no-param-reassign */
/* eslint-disable no-inner-declarations */
/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-loop-func */
/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */

import { el } from 'redom';
import { getAccountId } from '../../api/getAccountId';
import { getCardId, monthName } from '../../utils';

export async function variableTrans() {
  const canvas = el('canvas.dynamicBalance__width');
  const ctx = canvas.getContext('2d');
  const date = await getAccountId();
  const balance = date.payload.transactions;
  const nowD = new Date();
  const nameHalfYear = [];
  let max = {
    amount: 0,
    negative: 0,
  };
  let maxNum = max.amount;
  let maxNegative = max.negative;
  const allMonth = [];
  const montTitle = el('div.dynamicBalance__month');

  for (let i = 0; i < 12; i++) {
    const m = {
      month: nowD.getMonth() - i,
      year: nowD.getFullYear(),
    };
    if (m.month < 0) { m.month = 12 + m.month; m.year = nowD.getFullYear() - 1; }
    const nameMonth = el('p.dynamicBalance__nameMonth', monthName[m.month]);
    montTitle.prepend(nameMonth);
    nameHalfYear.push(m);
  }

  for (const item of nameHalfYear) {
    const { month, year } = item;
    let num = 0;
    let amount = 0;
    let negative = 0;
    const arr = balance.filter((n) => new Date(n.date).getMonth() === month && new Date(n.date).getFullYear() === year);
    arr.map((val) => {
      amount += Math.floor(val.amount);
      if (val.amount > num) { max = { amount }; num = val.amount; }
      if (max.amount > maxNum) maxNum = max.amount;
      if (val.to !== getCardId) { negative += Math.floor(val.amount); max.negative = negative; }
      if (max.negative > maxNegative) maxNegative = max.negative;
    });

    if (arr.length === 0) {
      max = 0;
    }
    allMonth.unshift(max);
  }

  const maximumMax = maxNum > maxNegative ? maxNum : maxNegative;

  const num = allMonth.map((val) => {
    const proc = {
      amount: Math.floor((val.amount / maximumMax) * 100),
      negative: Math.floor((val.negative / maximumMax) * 100),
    };
    return proc;
  });

  for (let i = 0; i < num.length; i++) {
    const dp = num[i];

    function create(item, name) {
      let myRect;

      if (name === 'amount') {
        myRect = {
          x: 13 + i * 22.5, y: 165 - ((165 / 100) * item), w: 20, h: (165 / 100) * item,
        };
        ctx.fillStyle = '#76CA66';
        ctx.fillRect(myRect.x, myRect.y, myRect.w, myRect.h);
      }
      if (name === 'negative') {
        myRect = {
          x: 13 + i * 22.5, y: 165 - ((165 / 100) * item), w: 20, h: (165 / 100) * item,
        };

        ctx.fillStyle = '#FD4E5D';
        ctx.fillRect(myRect.x, myRect.y, myRect.w, myRect.h);
      }
    }

    if (dp.amount) create(dp.amount, 'amount');
    if (dp.negative) create(dp.negative, 'negative');
  }
  const middleRate = Math.floor((maxNegative / (maximumMax)) * 100);
  const middle = el('p.variableTrans__middle', maxNegative);
  if (middleRate > 75) {
    middle.style.left = '110%';
    middle.style.color = '#FD4E5D';
    middle.style.textShadow = '1px 1px 0 red';
  }
  middle.style.bottom = `${middleRate}%`;
  const title = el('p.dynamicBalance__title', 'Соотношение входящих исходящих транзакций');
  const maxMin = el('p.dynamicBalance__maxMin', el('p', `${String(maxNum)}`), middle, el('p', '0'));
  const div = el('div.dynamicBalance__width-container', canvas, maxMin);
  const container = el('div.dynamicBalance__container', title, div, montTitle);

  return container;
}
