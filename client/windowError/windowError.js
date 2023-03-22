// eslint-disable-next-line import/no-extraneous-dependencies
import { el } from 'redom';

export function windowError() {
  const btnError = el('button.error_btn', 'Перезагрузка');
  btnError.addEventListener('click', () => {
    document.location.pathname = '/';
  });
  const retry = el('div', el('h1', 'Что то пошло не так, перезагрузите!'), btnError);
  document.body.innerHTML = '';
  document.body.append(retry);
}
