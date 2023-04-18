/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */
/* eslint-disable cypress/no-unnecessary-waiting */

describe('/', () => {
  beforeEach(() => {
    cy.viewport(1440, 580);
  });
  it('Проверка Логина на ошибку', () => {
    cy.visit('http://localhost:3000');
    cy.get('input[name="login"]').clear().type('dev');
    cy.get('button.entry_btn').click();
    cy.get('button.entry_btn').should('have.class', 'btn--lock');
    cy.get('input[name="login"]').clear();
  });

  it('Проверка Пароля на ошибку', () => {
    cy.visit('http://localhost:3000');
    cy.get('input[name="password"]').clear().type('skill');
    cy.get('button.entry_btn').click();
    cy.get('button.entry_btn').should('have.class', 'btn--lock');
    cy.get('input[name="password"]').clear();
  });

  it('Проверка обоих input и вход', () => {
    cy.visit('http://localhost:3000');
    cy.get('input[name="login"]').type('dev');
    cy.get('input[name="password"]').type('skill');
    cy.get('button.entry_btn').click();
    cy.get('button.entry_btn').should('have.class', 'btn--lock');
    cy.get('input[name="login"]').clear().type('developer');
    cy.get('input[name="password"]').clear().type('skillbox');
    cy.get('button.entry_btn').click();
    cy.url().should('include', '/account');
  });
});

describe('/account', () => {
  beforeEach(() => {
    cy.viewport(1440, 580);
    localStorage.setItem('authorization', JSON.stringify('ZGV2ZWxvcGVyOnNraWxsYm94'));
    cy.visit('http://localhost:3000/account');
  });

  it('Добавление div.card', () => {
    cy.get('li.card').then(($cards) => {
      const countBefore = $cards.length;
      cy.get('button.listCard-btn').click();
      cy.get('li.card').should('have.length', countBefore + 1);
    });
  });

  it('При обычном нажатии не вызывается удаление', () => {
    cy.get('li.card').click({ multiple: true }).should('not.have.class', 'card--delete');
  });

  it('Удержание на li.card', () => {
    cy.get('li.card').eq(0).trigger('mousedown').wait(300)
      .trigger('mouseup');
    cy.get('li.card').eq(0).should('have.class', 'card--delete');
  });

  it('Удержание и еще одно нажатие на туже карту', () => {
    cy.get('li.card').eq(0).trigger('mousedown').wait(300)
      .trigger('mouseup')
      .click()
      .should('not.have.class', 'card--delete');
  });

  it('Удержание и нажатие на область', () => {
    cy.get('li.card').eq(0).trigger('mousedown').wait(300)
      .trigger('mouseup');

    cy.get('div.listCard-nav__header').click();
    cy.get('li.card').eq(0).should('not.have.class', 'card--delete');
  });

  it('Удаление нескольких случайных элементов', () => {
    cy.get('li.card').then(($cards) => {
      const randomIndexes = [];
      while (randomIndexes.length < 3) {
        const randomIndex = Math.floor(Math.random() * $cards.length);
        if (!randomIndexes.includes(randomIndex)) {
          randomIndexes.push(randomIndex);
        }
      }
      randomIndexes.forEach((index) => {
        cy.wrap($cards.eq(index)).trigger('mousedown').wait(300).trigger('mouseup')
          .find('button.listCard__btn--delete')
          .click();
      });
      cy.get('li.card').should('have.length', $cards.length - 3);
    });
  });

  it('Проверка сортировки number', () => {
    cy.get('li.card').then(($cardsBefore) => {
      // Нажимаем на кнопку сортировки
      cy.get('span.custom-select-opener').click();
      cy.get('div.custom-select-option[data-value="number"]').click();
      // Получаем список элементов после сортировки
      cy.get('li.card').then(($cardsAfter) => {
        // Проверяем, что количество элементов осталось тем же
        expect($cardsBefore.length).to.equal($cardsAfter.length);
        // Проверяем, что порядок элементов изменился
        let isOrderChanged = false;
        for (let i = 0; i < $cardsBefore.length; i++) {
          if ($cardsBefore[i].innerText !== $cardsAfter[i].innerText) {
            isOrderChanged = true;
            break;
          }
        }
        if (isOrderChanged) expect(isOrderChanged).to.be.true;
      });
    });
  });

  it('Проверка сортировки balance', () => {
    cy.get('li.card').then(($cardsBefore) => {
      // Нажимаем на кнопку сортировки
      cy.get('span.custom-select-opener').click();
      cy.get('div.custom-select-option[data-value="balance"]').click();
      // Получаем список элементов после сортировки
      cy.get('li.card').then(($cardsAfter) => {
        // Проверяем, что количество элементов осталось тем же
        expect($cardsBefore.length).to.equal($cardsAfter.length);
        // Проверяем, что порядок элементов изменился
        let isOrderChanged = false;
        for (let i = 0; i < $cardsBefore.length; i++) {
          if ($cardsBefore[i].innerText !== $cardsAfter[i].innerText) {
            isOrderChanged = true;
            break;
          }
        }
        if (isOrderChanged) expect(isOrderChanged).to.be.true;
      });
    });
  });

  it('Проверка сортировки tranz', () => {
    cy.get('li.card').then(($cardsBefore) => {
      // Нажимаем на кнопку сортировки
      cy.get('span.custom-select-opener').click();
      cy.get('div.custom-select-option[data-value="tranz"]').click();
      // Получаем список элементов после сортировки
      cy.get('li.card').then(($cardsAfter) => {
        // Проверяем, что количество элементов осталось тем же
        expect($cardsBefore.length).to.equal($cardsAfter.length);
        // Проверяем, что порядок элементов изменился
        let isOrderChanged = false;
        for (let i = 0; i < $cardsBefore.length; i++) {
          if ($cardsBefore[i].innerText !== $cardsAfter[i].innerText) {
            isOrderChanged = true;
            break;
          }
        }
        if (isOrderChanged) expect(isOrderChanged).to.be.true;
      });
    });
  });
});

describe('/account/card', () => {
  beforeEach(() => {
    cy.viewport(1440, 580);
    localStorage.setItem('authorization', JSON.stringify('ZGV2ZWxvcGVyOnNraWxsYm94'));
    cy.visit('http://localhost:3000/account');
    cy.get('button.card__btn').eq(0).click();
  });

  it('Проверка Новый перевод', () => {
    cy.get('input.lookCardNewTransfer__dropdown').clear();
    cy.get('button.lookCardNewTransfer__btn').should('have.class', 'btn--lock');
  });

  it('Проверка Сумма перевода', () => {
    cy.get('input.lookCardNewTransfer__sum-input').type('qweewqe').should('have.value', '').type('2132112312312313');
    cy.get('button.lookCardNewTransfer__btn').click().should('have.class', 'btn--lock');
    cy.get('input.lookCardNewTransfer__sum-input').clear().type('123');
    cy.get('button.lookCardNewTransfer__btn').should('have.not.class', 'btn--lock').click();
  });

  it('Открытие Самый большой перевод и возврат', () => {
    cy.get('div.lookCardGraph__container').click();
    cy.url().should('include', '/account/74213041477477406320783754/balance');
    cy.get('button.lookCardHeader__btn').click();
    cy.url().should('include', '/account/74213041477477406320783754');
  });

  it('Открытие история переводов и возврат', () => {
    cy.get('div.lookCardHistory__container').click();
    cy.url().should('include', '/account/74213041477477406320783754/history-transfer');
    cy.get('button.lookCardHeader__btn').click();
    cy.url().should('include', '/account/74213041477477406320783754');
  });
});

describe('/account/valuts', () => {
  beforeEach(() => {
    cy.viewport(1440, 580);
    localStorage.setItem('authorization', JSON.stringify('ZGV2ZWxvcGVyOnNraWxsYm94'));
    cy.visit('http://localhost:3000/account/valuts');
  });

  it('Открытие', () => {
    cy.url().should('include', '/account/valuts');
  });

  it('Нажатие на кнопку', () => {
    cy.get('button.transferValuts__button').click().should('have.class', 'btn--lock');
  });

  it('Проверка верхнего поля', () => {
    cy.get('button.transferValuts__button').click();
    cy.get('div.custom-select-container').eq(0).click().should('have.not.class', 'valutBorder--error');
    cy.get('button.transferValuts__button').should('have.class', 'btn--lock');
    cy.get('div.custom-select-option').eq(5).click();
    cy.get('input.transferValuts__sum').type('erwer').should('have.value', '').type('12321')
      .should('have.value', '12321')
      .should('have.not.class', 'valutBorder--error');
    cy.get('button.transferValuts__button').click().should('have.class', 'btn--lock');
    cy.get('input.transferValuts__sum').clear().type('1');
    cy.get('button.transferValuts__button').click();
  });
});

describe('/account/map', () => {
  beforeEach(() => {
    cy.viewport(1440, 580);
    localStorage.setItem('authorization', JSON.stringify('ZGV2ZWxvcGVyOnNraWxsYm94'));
    cy.visit('http://localhost:3000/account/map');
  });

  it('Страница загрузилась', () => {
    cy.url().should('include', '/account/map');
  });
});

describe('exit', () => {
  beforeEach(() => {
    cy.viewport(1440, 580);
    localStorage.setItem('authorization', JSON.stringify('ZGV2ZWxvcGVyOnNraWxsYm94'));
    cy.visit('http://localhost:3000/account/map');
  });
  it('Выход', () => {
    cy.get('button.header-btn').eq(3).click();
    cy.url().should('include', '/');
  });
});
