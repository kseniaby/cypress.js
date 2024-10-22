import * as main_page from "../locators/main_page.json";
import * as result_page from "../locators/result_page.json";
import * as recovery_page from "../locators/recovery_password_page.json";
import * as data from "../helpers/default_data.json";

describe("Проверка формы авторизации", function () {
  beforeEach("Начало теста", function () {
    cy.visit("https://login.qa.studio");
    cy.get(main_page.fogot_pass_btn).should(
      "have.css",
      "color",
      "rgb(0, 85, 152)"
    );
  });

  afterEach("Конец теста", function () {
    cy.get(result_page.close).should("be.visible");
    cy.get(result_page.footer).should("be.visible");
  });

  it("Верный логин и пароль", function () {
    cy.get(main_page.email).type(data.login);
    cy.get(main_page.password).type(data.password);
    cy.get(main_page.login_button).click();

    cy.get(result_page.title).contains("Авторизация прошла успешно");
    cy.get(result_page.title).should("be.visible");
  });

  it("Восстановление пароля", function () {
    cy.get(main_page.fogot_pass_btn).click();
    cy.get(recovery_page.email).type(data.login);
    cy.get(recovery_page.send_button).click();

    cy.get(result_page.title).contains("Успешно отправили пароль на e-mail");
    cy.get(result_page.title).should("be.visible");
  });

  it("Верный логин и неверный пароль", function () {
    cy.get(main_page.email).type(data.login);
    cy.get(main_page.password).type("123");
    cy.get(main_page.login_button).click();

    cy.get(result_page.title).contains("Такого логина или пароля нет");
    cy.get(result_page.title).should("be.visible");
  });

  it("Неверный логин и верный пароль", function () {
    cy.get(main_page.email).type("ksenia@mail.ru");
    cy.get(main_page.password).type(data.password);
    cy.get(main_page.login_button).click();

    cy.get(result_page.title).contains("Такого логина или пароля нет");
    cy.get(result_page.title).should("be.visible");
  });

  it("Логин без @", function () {
    cy.get(main_page.email).type("germandolnikov.ru");
    cy.get(main_page.password).type(data.password);
    cy.get(main_page.login_button).click();

    cy.get(result_page.title).contains("Нужно исправить проблему валидации");
    cy.get(result_page.title).should("be.visible");
  });

  it("Верный пароль, логин в верхнем регистре", function () {
    cy.get(main_page.email).type(data.login.toUpperCase());
    cy.get(main_page.password).type(data.password);
    cy.get(main_page.login_button).click();

    cy.get(result_page.title).contains("Авторизация прошла успешно");
    cy.get(result_page.title).should("be.visible");
  });
});
