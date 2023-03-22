export const getCardId = JSON.parse(localStorage.getItem('cardId'));
export const arrAccounts = [];
export function accountTo(to) {
  let jsonArray;
  if (to === undefined) return;
  if (JSON.parse(localStorage.getItem('arrayTo') !== null)) {
    const array = JSON.parse(localStorage.getItem('arrayTo'));
    array.push(to);
    jsonArray = array;
  } else {
    arrAccounts.push(to);
    jsonArray = arrAccounts;
  }

  localStorage.setItem('arrayTo', JSON.stringify(jsonArray));
}

export const monthName = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
