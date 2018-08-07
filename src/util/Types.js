/**
 * Product class.
 */
export class Product {
  /**
   * Constructor.
   * 
   * @param {number} id Product ID
   * @param {string} name Product name
   * @param {string} vendorName Vendor name
   * @param {string} vendorLocation Vendor location
   * @param {number} price Product price
   * @param {string} description product description
   * @param {[number]} categoryIds Array with category IDs product belongs to
   */
  constructor(id, name, vendorName, vendorLocation, price, description, categoryIds) {
    this.id = id;
    this.name = name;
    this.vendorName = vendorName;
    this.vendorLocation = vendorLocation;
    this.price = price;
    this.description = description;
    this.categoryIds = categoryIds;

    this.__typename = 'Product';
  }
}

/**
 * Category class.
 */
export class Category {
  /**
   * 
   * @param {number} id Category ID
   * @param {string} name Category name
   * @param {number} productCount Number of products in the category
   */
  constructor(id, name, productCount) {
    this.id = id;
    this.name = name;
    this.productCount = productCount;
    
    this.__typename = 'Category';
  }
}
