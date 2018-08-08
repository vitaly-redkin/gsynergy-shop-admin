/**
 * Generates random products and categories.
 */
import { Category, Product } from './Types';

/**
 * Generates the given number ofproducts and categories.
 * 
 * @param {number} productCount Number of products to generate
 * @param {number} categoryCount Number of categories to generate
 * @param {number} maxCategoryPerProductCount maximal number of categories per product
 * @returns {[Product], [Category]} {products, categories} Object with generated products and categories as arrays
 */
export function generateProductsAndCategories(
  productCount = PRODUCT_COUNT,
  categoryCount = CATEGORY_COUNT,
  maxCategoryPerProductCount = MAX_CATEGORY_PER_PRODUCT_COUNT
) {
  const result = { products: [], categories: [] };

  // Generate categories
  for (let i = 1; i <= categoryCount; i++) {
    const category = new Category(i, `Category ${i}`, 0);
    result.categories.push(category);
  }

  // Generate products
  for (let i = 1; i <= productCount; i++) {
    // Generate product category IDs
    const categoryIds = [];
    const productCategoryCount = Math.round(Math.random() * maxCategoryPerProductCount); 
    for (let j = 0; j <= productCategoryCount; j++) {
      const categoryId = Math.ceil(Math.random() * categoryCount);
      if (categoryIds.indexOf(categoryId) >= 0) {
        // If category ID repeats, skip it
        continue;
      }

      // Increment product category count
      const category = result.categories.find((c) => c.id === categoryId);
      if (category) {
        category.productCount++;
        // Add category ID to product only if category found - just in case
        categoryIds.push(categoryId);
      }
    }
    
    const price = Math.round(Math.random() * MAX_PRICE, 2);
    const description = FULL_DESCRIPTION.substring(
      0,  Math.ceil(Math.random() * FULL_DESCRIPTION.length));
    const product = new Product(
      i, `Product ${i}`, `Vendor ${i}`, `Location ${i}`, price, description, categoryIds);
    result.products.push(product);
  }

  return result;
}

export const PRODUCT_COUNT = 100;
export const CATEGORY_COUNT = 10;
const MAX_CATEGORY_PER_PRODUCT_COUNT = 3;
const MAX_PRICE = 10000;
const FULL_DESCRIPTION = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rhoncus vitae turpis sed ullamcorper. Phasellus ac mi eu enim pellentesque interdum. Proin eleifend lobortis ultrices. Cras sed mauris ut erat volutpat rhoncus. Donec tincidunt dui nibh, eget faucibus ante molestie at. Donec in gravida dui. Etiam vitae dapibus augue. Etiam nec varius velit, et venenatis lacus. Donec sed viverra orci. Curabitur facilisis nisl ipsum, id pretium augue luctus eu. Cras ut consectetur sapien, id posuere dui. In in augue eget magna pellentesque lacinia in eu leo. Cras placerat dapibus sapien, eu pulvinar enim ornare vel. Nunc lobortis laoreet metus ultricies rutrum. Suspendisse vitae iaculis massa. Maecenas placerat finibus sollicitudin.';
