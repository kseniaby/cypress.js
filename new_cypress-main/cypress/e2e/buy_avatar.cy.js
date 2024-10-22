import * as data from "../helpers/pokemons_data.json";
import * as auth from "../locators/auth_page_pokemons.json";
import * as main_page from "../locators/main_page_pokemons.json";
import * as my_trainer_page from "../locators/trainer_page_pokemons.json";
import * as shop_page from "../locators/shop_page_pokemons.json";
import * as pay_page from "../locators/pay_page_pokemons.json";
import * as card from "../helpers/pokemons_card.json";
import * as push from "../locators/push_code_page_pokemons.json";

describe("Покупка аватара в Покемонах", function () {
  beforeEach("Начало теста", function () {
    cy.visit("https://pokemonbattle.ru");
  });

  it("Покупка аватара", function () {
    cy.get(auth.login_input).type(data.login);
    cy.get(auth.password_input).type(data.password);
    cy.get(auth.login_btn).click();

    cy.get(main_page.my_trainer_page).click();
    cy.get(my_trainer_page.buy_avatar_link).click();

    cy.get(shop_page.free_avatar).first().click();

    cy.get(pay_page.number_card_input).type(card.number);
    cy.get(pay_page.term_input).type(card.term);
    cy.get(pay_page.code_input).type(card.code);
    cy.get(pay_page.name_input).type(card.name.toUpperCase());
    cy.get(pay_page.pay_btn).click();

    cy.get(push.push_input).type("56456");
    cy.get(push.send_btn).click();

    cy.contains("Покупка прошла успешно").should("be.visible");
  });
});
