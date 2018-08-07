import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import Main from '../main/Main';
import { PRODUCT_COUNT, CATEGORY_COUNT } from '../../util/DataGenerator';

const enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");

enzyme.configure({ adapter: new Adapter() });

describe("Smoke Test", () =>  {
  it('Application main component renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Main />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe("Test if component can be assigned to category", async () => {
  const { data, categoryCard, product, category } =
    findProductAndCategoryToAdd();

  it('Product and category to add found', () => {
    expect(categoryCard && product && category).toBeTruthy();
  });

  const productCount = category.productCount;
  const props = categoryCard.parent().get(0).props;
  const mutationPayload = { variables: { 
    productId: product.id, 
    categoryId: category.id 
  } };
  await props.assignProductToCategory(mutationPayload);

  const newCategory = data[`Category:${category.id}`];
  const newProductCount = newCategory.productCount;
  if (newProductCount !== productCount + 1) {
    throw new Error(`Category product count has not been increased: ${newProductCount} instead of ${productCount + 1}`);
  }
  it('Category product count increased', () => {
    expect(newProductCount).toBe(productCount + 1);
  });

  // Try to add again - nothing should be changed
  await props.assignProductToCategory(mutationPayload);

  const newCategory2 = data[`Category:${category.id}`];
  const newProductCount2 = newCategory2.productCount;
  if (newProductCount2 !== newProductCount) {
    throw new Error(`Category product count has been increased: ${newProductCount2} instead of ${newProductCount}`);
  }
  it('Category product count not increased when the same product added to category again', () => {
    expect(newProductCount2).toBe(newProductCount);
  });


});

// Utility functions
function createWrapper() {
  const wrapper = mount(<Main />);
//  console.log(wrapper.debug());
  const apolloProvider = wrapper.find('ApolloProvider');
  const client = apolloProvider.get(0).props.client;
  const data = client.store.cache.data.data;
//  console.log(client);
//  console.log(client.store.cache.data.data['Category:1']);
  return { wrapper, data };
}

function findProductAndCategoryToAdd() {
  const { wrapper, data } = createWrapper();
  let productToAdd = null;
  let categoryToAdd = null;
  let categoryCardToAdd = null;

  for (let categoryId = 1; categoryId <= CATEGORY_COUNT; categoryId++) {
    const categoryCard = wrapper.find(`#categoryCard_${categoryId}`);
    const category = categoryCard.parent().get(0).props.category;
    for (let productId = 1; productId <= PRODUCT_COUNT; productId++) {
      const productCard = wrapper.find(`#productCard_${categoryId}`);
      const product = productCard.parent().get(0).props.product;
      if (product.categoryIds.indexOf(categoryId) < 0) {
        productToAdd = product;
        categoryToAdd = category;
        categoryCardToAdd = categoryCard;
        break;
      }
    }

    if (productToAdd && categoryToAdd) {
      break;
    }
  }

  return { 
    wrapper, 
    data,
    categoryCard: categoryCardToAdd, 
    product: productToAdd, 
    category: categoryToAdd };
}
