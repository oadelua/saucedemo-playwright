// @ts-check
//import { test, expect } from '@playwright/test';

import {test, expect} from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('username').fill('standard_user');
  await page.getByTestId('password').fill('secret_sauce');
  await page.getByTestId('login-button').click();
  await expect(page).toHaveURL(/inventory/);
});

test('Verify user can add to cart', async ({ page }) => {

  const card = page.getByTestId('inventory-item').filter({hasText: 'Sauce Labs Backpack'});
  await card.getByRole('button', {name:'Add to cart'}).click();

  await page.getByTestId('shopping-cart-link').click();


  await expect(page.getByTestId('inventory-item-price').filter({hasText: '$29.99'})).toBeVisible();
  await expect(page).toHaveURL(/cart/);
  await expect(page.getByTestId('inventory-item').filter({hasText: 'Sauce Labs Backpack'})).toBeVisible();
});

test('two added products appear in cart with correct prices', async ({ page }) => {
  // Add both on the inventory page
  const backpackCard = page.getByTestId('inventory-item').filter({ hasText: 'Sauce Labs Backpack' });
  await backpackCard.getByRole('button', { name: 'Add to cart' }).click();

  const lightCard = page.getByTestId('inventory-item').filter({ hasText: 'Sauce Labs Bike Light' });
  await lightCard.getByRole('button', { name: 'Add to cart' }).click();

  await expect(page.getByTestId('shopping-cart-badge')).toHaveText('2');

  await page.getByTestId('shopping-cart-link').click();
  await expect(page).toHaveURL(/cart/);

  // Count check first — exactly two items, no more, no fewer
  await expect(page.getByTestId('inventory-item')).toHaveCount(2);

  // Then one scoped check per item
  const backpackInCart = page.getByTestId('inventory-item').filter({ hasText: 'Sauce Labs Backpack' });
  await expect(backpackInCart.getByTestId('inventory-item-price')).toHaveText('$29.99');

  const lightInCart = page.getByTestId('inventory-item').filter({ hasText: 'Sauce Labs Bike Light' });
  await expect(lightInCart.getByTestId('inventory-item-price')).toHaveText('$9.99');
});

