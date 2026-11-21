export class InventoryPage {

constructor (page) {
    this.page = page;
    this.inventoryItems = page.getByTestId('inventory-item');
    this.sortDropdown = page.getByTestId('product-sort-container');
}
productCard(productName) {
    return this.inventoryItems.filter({ hasText: productName });
}
async addToCart(productName) {
    const selectedProduct = this.productCard(productName);
    await selectedProduct.getByRole('button', { name: 'Add to cart' }).click();    
}
async sortBy(option) {
    await this.sortDropdown.selectOption(option);
}
async openCart() {
    await this.page.getByTestId('shopping-cart-link').click();
}
}