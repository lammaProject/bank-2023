/* eslint-disable import/no-extraneous-dependencies */
import { el } from 'redom';
import { lookCardHistory } from '../lookCard/lookCardContent/lookCardHistory/lookCardHistory';
import { lookCardHeader } from '../lookCard/lookCardHeader/lookCardHeader';
// import { getCardId } from '../utils';

export async function cardTransfer() {
  // CREATE
  let val = 20;
  const header = await lookCardHeader('Вся история баланса');
  const table = await lookCardHistory(val);
  const button = el('button.transfer__more', 'Посмотреть ещё');
  const container = el('section.cardTransfer', header, table, button);

  // ACTIVE
  button.addEventListener('click', async () => {
    val += 10;
    button.classList.add('more--active');
    button.parentNode.replaceChild(await lookCardHistory(val), button.previousElementSibling);
    // button.before(await lookCardHistory(val));
    // window.scrollTo(0, document.body.scrollHeight);
    button.classList.remove('more--active');
  });
  return container;
}
