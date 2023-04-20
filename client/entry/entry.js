// eslint-disable-next-line import/no-extraneous-dependencies
import { el } from 'redom';

export function entry() {
  const loginLabel = el('label.entry_label', 'Логин');
  const loginInput = el('input.entry_input', { type: 'text', value: 'anton', name: 'login' });
  const passwordLabel = el('label.entry_label', 'Пароль');
  const passworlInput = el('input.entry_input', { type: 'text', value: 'anton', name: 'password' });
  const btn = el('button.entry_btn', 'Войти');
  const form = el('form.entry.form', el('div.entry_press', loginLabel, loginInput), el('div.entry_press', passwordLabel, passworlInput), btn);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
  });

  function check(e) {
    const warning = document.querySelectorAll('.warningMain');

    if (e.target.classList.contains('entry__input--error')) {
      e.target.classList.remove('entry__input--error');
      e.target.nextElementSibling.remove();

      if (!e.target.nextElementSibling) {
        if (warning.length < 2) btn.classList.remove('btn--lock');
      }
    }
  }

  loginInput.addEventListener('input', (e) => check(e));
  passworlInput.addEventListener('input', (e) => check(e));

  const card = el('section.entry_card', el('h1.entry_title', 'Вход в аккаунт'), form);
  return {
    card, loginInput, passworlInput, btn,
  };
}
