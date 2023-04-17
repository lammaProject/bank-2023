/* eslint-disable no-inner-declarations */
/* eslint-disable array-callback-return */
/* eslint-disable no-loop-func */
/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable import/no-extraneous-dependencies */
import { el } from 'redom';
import { getAccountId } from '../../../api/getAccountId';
import { getCardId, monthName } from '../../../utils';

export async function lookCardGraghic() {
  // CREATE
  const canvas = el('canvas.lookCardGraph__width');
  const ctx = canvas.getContext('2d');
  const date = await getAccountId();
  const balance = date.payload.transactions;
  const nowD = new Date();
  const nameHalfYear = [];
  let max = 0;
  let maxNum = max;
  const allMonth = [];
  const montTitle = el('div.lookCardGraph__month');

  for (let i = 0; i < 6; i++) {
    const m = {
      month: nowD.getMonth() - i,
      year: nowD.getFullYear(),
    };
    if (m.month < 0) { m.month = 12 + m.month; m.year = nowD.getFullYear() - 1; }
    const nameMonth = el('p.lookCardGraph__nameMonth', monthName[m.month]);
    montTitle.prepend(nameMonth);
    nameHalfYear.push(m);
  }

  for (const item of nameHalfYear) {
    const { month, year } = item;
    let num = 0;
    const arr = balance.filter((n) => new Date(n.date).getMonth() === month && new Date(n.date).getFullYear() === year);
    arr.map((val) => {
      if (val.amount > num) { max = val.amount; num = val.amount; }
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
      x: 30 + i * 45, y: 165 - ((165 / 100) * dp), w: 40, h: (165 / 100) * dp,
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

  const title = el('p.lookCardGraph__title', 'Самый большой перевод');
  const maxMin = el('p.lookCardGraph__maxMin', el('p', `${String(maxNum)}`), el('p', '0'));
  const div = el('div.loogCardGraph__width-container', canvas, maxMin);
  const container = el('div.lookCardGraph__container', title, div, montTitle);

  // ACTIVE
  container.addEventListener('click', () => {
    window.location.pathname = `/account/${getCardId}/balance`;
  });

  return container;
}
