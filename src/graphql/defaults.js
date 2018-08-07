/**
 * Default application state.
 */
import * as DataGenerator from '../util/DataGenerator';

const generatedData = DataGenerator.generateProductsAndCategories();

export default generatedData;

/*
export default {
  products: DataGenerator.products,
  categories: DataGenerator.categories,
};
*/