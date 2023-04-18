/* eslint-disable cypress/no-unnecessary-waiting */
// describe('/', () => {
//   beforeEach(() => {
//     cy.viewport(1440, 580);
//   });
//   it('Проверка Логина на ошибку', () => {
//     cy.visit('http://localhost:3000');
//     cy.get('input[name="login"]').clear().type('dev');
//     cy.get('button.entry_btn').click();
//     cy.get('button.entry_btn').should('have.class', 'btn--lock');
//     cy.get('input[name="login"]').clear();
//   });

//   it('Проверка Пароля на ошибку', () => {
//     cy.visit('http://localhost:3000');
//     cy.get('input[name="password"]').clear().type('skill');
//     cy.get('button.entry_btn').click();
//     cy.get('button.entry_btn').should('have.class', 'btn--lock');
//     cy.get('input[name="password"]').clear();
//   });

//   it('Проверка обоих input и вход', () => {
//     cy.visit('http://localhost:3000');
//     cy.get('input[name="login"]').type('dev');
//     cy.get('input[name="password"]').type('skill');
//     cy.get('button.entry_btn').click();
//     cy.get('button.entry_btn').should('have.class', 'btn--lock');
//     cy.get('input[name="login"]').clear().type('developer');
//     cy.get('input[name="password"]').clear().type('skillbox');
//     cy.get('button.entry_btn').click();
//     cy.url().should('include', '/account');
//   });
// });

describe('/account', () => {
  beforeEach(() => {
    cy.viewport(1440, 580);
    localStorage.setItem('authorization', JSON.stringify('ZGV2ZWxvcGVyOnNraWxsYm94'));
    cy.visit('http://localhost:3000/account');
  });

  //   it('Добавление div.card', () => {
  //     cy.get('li.card').then(($cards) => {
  //       const countBefore = $cards.length;
  //       cy.get('button.listCard-btn').click();
  //       cy.get('li.card').should('have.length', countBefore + 1);
  //     });
  //   });

  it('При обычном нажатии не вызывается удаление', () => {
    cy.get('li.card').click({ multiple: true }).should('not.have.class', 'card--delete');
  });

  it('Удержание на li.card', () => {
    cy.get('li.card').eq(0).trigger('mousedown').wait(300)
      .trigger('mouseup');
    cy.get('li.card').eq(0).should('have.class', 'card--delete');
  });

  it('Нажатие на несколько элементов случайным образом', () => {
    cy.get('li.card', { multiple: true }).then((cards) => {
      const randomIndex = Math.floor(Math.random() * cards.length);
      const randomCard = cards[randomIndex];
      cy.wrap(randomCard)
        .trigger('mousedown')
        .wait(300)
        .trigger('mouseup')
        .find('.listCard__btn--delete')
        .should('exist')
        .click();
      cy.get('li.card').should('have.length', cards.length - 1);
    });
  });
});
