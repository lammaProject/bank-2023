// eslint-disable-next-line import/no-extraneous-dependencies
import { el } from 'redom';

export function entry() {
  const loginLabel = el('label.entry_label', 'Логин');
  const loginInput = el('input.entry_input', { type: 'text', value: 'developer' });
  const passwordLabel = el('label.entry_label', 'Пароль');
  const passworlInput = el('input.entry_input', { type: 'text', value: 'skillbox' });
  const btn = el('button.entry_btn', 'Войти');
  const form = el('form.entry.form', el('div.entry_press', loginLabel, loginInput), el('div.entry_press', passwordLabel, passworlInput), btn);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
  });

  const card = el('section.entry_card', el('h1.entry_title', 'Вход в аккаунт'), form);
  return {
    card, loginInput, passworlInput, btn,
  };
}
