import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { mount } from 'enzyme';
import { createClient } from '../../graphql/client';
import Main from '../main/Main';
import App from '../app/App';
import { PRODUCT_COUNT, CATEGORY_COUNT } from '../../util/DataGenerator';

//-----------------------------------------------------------------------------
// Enzyme configuration
//-----------------------------------------------------------------------------
const enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");
enzyme.configure({ adapter: new Adapter() });

//-----------------------------------------------------------------------------
// Tests
// 
// I cannot make it() calls to wait till await categoryCard.get(0).props.onDrop()
// completes. So I added a synchronous checks which throws exceptions.
//-----------------------------------------------------------------------------
describe("Smoke Test", () =>  {
  it('Application main component renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Main />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe("Test if component can correctly be assigned to category", async () => {
  const client = createClient();
  const { categoryCard, product, category } = findProductAndCategoryToTest(client, false);

  it('Product and category to add found', () => {
    expect(categoryCard && product && category).toBeTruthy();
  });

  const categoryId = category.id;
  const productId = product.id;
  const productCount = category.productCount;
  const categoryIds = product.categoryIds;

  it('Category product count increased and category ID has been added to product', async () => {
    // Emulate dropping product to the category
    await categoryCard.get(0).props.onDrop({product});

    const wrapperAfterAdd = createWrapper(client);

    const updatedCategoryCard = findCategoryById(wrapperAfterAdd, categoryId).categoryCard;
    const updatedCategoryCardBadgeText = updatedCategoryCard.find('.badge').text().replace(',', '');
    const newProductCount = parseInt(updatedCategoryCardBadgeText);

    // Category product count increased
    expect(newProductCount).toBe(productCount + 1);

    const updatedProduct = findProductById(wrapperAfterAdd, productId).product;
    const updatedCategoryIds = updatedProduct.categoryIds;
    const expectedCategoryIds = categoryIds.concat(categoryId);
  
    // Product categoryIds list has been appended
    expect(JSON.stringify(updatedCategoryIds)).toBe(JSON.stringify(expectedCategoryIds));
  });
});

describe("Test if component can't  be assigned to category twice", async () => {
  const client = createClient();
  const { categoryCard, product, category } = findProductAndCategoryToTest(client, true);

  it('Product and category to assign again found', () => {
    expect(categoryCard && product && category).toBeTruthy();
  });

  const categoryId = category.id;
  const productId = product.id;
  const productCount = category.productCount;
  const categoryIds = product.categoryIds;

  it('Category product count and category ID have NOT BEEN changed', async () => {
    // Emulate dropping product to the category
    await categoryCard.get(0).props.onDrop({product});

    const wrapperAfterAdd = createWrapper(client);

    const updatedCategoryCard = findCategoryById(wrapperAfterAdd, categoryId).categoryCard;
    const updatedCategoryCardBadgeText = updatedCategoryCard.find('.badge').text().replace(',', '');
    const newProductCount = parseInt(updatedCategoryCardBadgeText);

    // Category product count NOT increased
    expect(newProductCount).toBe(productCount);

    const updatedProduct = findProductById(wrapperAfterAdd, productId).product;
    const updatedCategoryIds = updatedProduct.categoryIds;
    const expectedCategoryIds = categoryIds;
  
    // Product categoryIds list has NOT been changed
    expect(JSON.stringify(updatedCategoryIds)).toBe(JSON.stringify(expectedCategoryIds));
  });
});

//-----------------------------------------------------------------------------
// Utility functions
//-----------------------------------------------------------------------------
function createWrapper(client) {
  const wrapper = mount(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
  return wrapper;
}

function findProductAndCategoryToTest(client, alreadyAssigned) {
  const wrapper = createWrapper(client);
  let productToReturn = null;
  let categoryToReturn = null;
  let categoryCardToReturn = null;

  for (let categoryId = 1; categoryId <= CATEGORY_COUNT; categoryId++) {
    const { categoryCard, category } = findCategoryById(wrapper, categoryId);
    for (let productId = 1; productId <= PRODUCT_COUNT; productId++) {
      const { product } = findProductById(wrapper, productId);
      if ((alreadyAssigned && product.categoryIds.indexOf(categoryId) >= 0) ||
          (!alreadyAssigned && product.categoryIds.indexOf(categoryId) < 0)) {
        productToReturn = product;
        categoryToReturn = category;
        categoryCardToReturn = categoryCard;
        break;
      }
    }

    if (productToReturn && categoryToReturn) {
      break;
    }
  }

  return { 
    wrapper, 
    categoryCard: categoryCardToReturn, 
    product: productToReturn, 
    category: categoryToReturn };
}

function findProductById(wrapper, productId) {
  const productCard = wrapper.find(`#productCard_${productId}`);
  const product = productCard.parent().get(0).props.product;
  return { productCard, product };
}

function findCategoryById(wrapper, categoryId) {
  const categoryCard = wrapper.find(`#categoryCard_${categoryId}`);
  const category = categoryCard.parent().get(0).props.category;
  return { categoryCard, category };
}
