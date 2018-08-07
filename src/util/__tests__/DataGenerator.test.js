/**
 * Test cases for the DataGenerator module.
 */

import * as DataGenerator from '../DataGenerator';
import { Category, Product } from '../Types';

describe('Products and categories generated correctly', () => {
  const productCount = 100;
  const categoryCount = 10;
  const maxProductPerCategory = 5;
  const { products, categories } = DataGenerator.generateProductsAndCategories(
    productCount, categoryCount, maxProductPerCategory);
  
//    console.log(JSON.stringify(products, null, 2));
//    console.log(JSON.stringify(categories, null, 2));

  it('Number of products is as ordered', () => {
    expect(productCount).toEqual(products.length);
  });
  it('Number of categories is as ordered', () => {
    expect(categoryCount).toEqual(categories.length);
  });
});

