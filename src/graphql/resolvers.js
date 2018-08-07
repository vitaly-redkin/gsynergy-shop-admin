/**
 * GraphQL Mutation resolvers.
 */
import * as Queries from './queries';

export default {
  Mutation: {
    assignProductToCategoryMutation: (_, {productId, categoryId}, { cache }) => {
      // Add category to the product category list
      const productIdParam = `Product:${productId}`;
      const product = cache.readFragment({ 
        fragment: Queries.productCategoriesFragment, id: productIdParam });
      if (product.categoryIds.indexOf(categoryId) >= 0) {
        // Product already belongs to this category
        return null;
      }
      const newProduct = { ...product, categoryIds: product.categoryIds.concat(categoryId) };
      cache.writeData({ id: productIdParam, data: newProduct });

      // Update category product count
      const categoryIdParam = `Category:${categoryId}`;
      const category = cache.readFragment(
        { fragment: Queries.categoryProductCountFragment, id: categoryIdParam });
      const newCategory = { ...category, productCount: category.productCount + 1 };
      cache.writeData({ id: categoryIdParam, data: newCategory });

      return null;
    },
  
  },
};
