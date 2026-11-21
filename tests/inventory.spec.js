// @ts-check

import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import { InventoryPage } from "../pages/InventoryPage.js";
import { CartPage } from "../pages/CartPage.js";

test.beforeEach("login as standard user", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login("standard_user", "secret_sauce");
  await expect(page).toHaveURL(/inventory/);
});

test("Verify user can add to cart", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await expect(page.getByTestId("title")).toHaveText("Products");
  await inventoryPage.addToCart("Sauce Labs Backpack");
  await inventoryPage.addToCart("Sauce Labs Bike Light");
  await inventoryPage.openCart();
  await expect(page).toHaveURL(/cart/);
  await expect(cartPage.getCartItem('Sauce Labs Backpack')).toBeVisible();
});

test("verify cart items", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.addToCart("Sauce Labs Bolt T-Shirt");
  await inventoryPage.addToCart("Sauce Labs Fleece Jacket");
  await inventoryPage.openCart();
  await expect(page).toHaveURL(/cart/);

  const cartPage = new CartPage(page);
  await cartPage.removeFromCart("Sauce Labs Bolt T-Shirt");
  await expect(cartPage.getCartItem("Sauce Labs Bolt T-Shirt")).not.toBeVisible();
  await expect(cartPage.getCartItem("Sauce Labs Fleece Jacket")).toBeVisible();
  await cartPage.checkout();
  await expect(page).toHaveURL(/checkout/);

});
