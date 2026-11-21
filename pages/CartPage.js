export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.getByTestId("inventory-item");
    this.itemPrice = page.getByTestId("inventory-item-price");
    this.checkoutBtn = page.getByTestId("checkout");
  }

  getCartItem(productName) {
    return this.cartItems.filter({ hasText: productName });
  }

  async removeFromCart(productName) {
    await this.getCartItem(productName)
      .getByRole("button", { name: "Remove" })
      .click();
  }
  async checkout() {
    await this.checkoutBtn.click();
  }
}
