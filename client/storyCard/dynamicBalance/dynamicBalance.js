/* eslint-disable no-inner-declarations */
/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-loop-func */
/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */

import { el } from 'redom';
import { getAccountId } from '../../api/getAccountId';
import { monthName } from '../../utils';

export async function dynamicBalance() {
  const canvas = el('canvas.dynamicBalance__width');
  const ctx = canvas.getContext('2d');
  const date = await getAccountId();
  const balance = date.payload.transactions;
  const nowD = new Date();
  const nameHalfYear = [];
  let max = 0;
  let maxNum = max;
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
    const arr = balance.filter((n) => new Date(n.date).getMonth() === month && new Date(n.date).getFullYear() === year);
    arr.map((val) => {
      amount += Math.floor(val.amount);
      if (val.amount > num) { max = amount; num = val.amount; }
      if (max > maxNum) maxNum = max;
    });

    if (arr.length === 0) {
      max = 0;
    }
    allMonth.unshift(max);
  }

  const num = allMonth.map((val) => {
    const proc = Math.floor((val / maxNum) * 100);
    return proc;
  });

  for (let i = 0; i < num.length; i++) {
    let dp = num[i];
    if (dp < 20) dp *= 10;
    const myRect = {
      x: 13 + i * 22.5, y: 165 - ((165 / 100) * dp), w: 20, h: (165 / 100) * dp,
    };
    const timeInterval = 20;
    const thick = 3;
    ctx.fillStyle = '#116ACC';

    let cpt = 0;

    function drawLittleRect(ind) {
      let tempY = myRect.y + myRect.h - ind;

      if (tempY < myRect.y) {
        tempY = myRect.y;
      }

      ctx.fillRect(myRect.x, tempY, myRect.w, thick);
    }

    for (let ind = thick; ind < myRect.h + thick; ind += thick) {
      setTimeout(() => {
        drawLittleRect(ind);
      }, timeInterval * cpt, ind);
      cpt++;
    }
  }

  const title = el('p.dynamicBalance__title', 'Динамика баланса');
  const maxMin = el('p.dynamicBalance__maxMin', el('p', `${String(maxNum)}`), el('p', '0'));
  const div = el('div.dynamicBalance__width-container', canvas, maxMin);
  const container = el('div.dynamicBalance__container', title, div, montTitle);

  return container;
}
