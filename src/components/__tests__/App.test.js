import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { mount } from 'enzyme';
import { client } from '../../graphql/client';
import Main from '../main/Main';
import App from '../app/App';
import { PRODUCT_COUNT, CATEGORY_COUNT } from '../../util/DataGenerator';
import * as GlobalData from '../../util/GlobalData';

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
  const { categoryCard, product, category } =
    findProductAndCategoryToAdd();

  it('Product and category to add found', () => {
    expect(categoryCard && product && category).toBeTruthy();
  });

  const categoryId = category.id;
  const productId = product.id;
  const productCount = category.productCount;
  const categoryIds = product.categoryIds;

  // Assign "dragged" product to the global variable
  GlobalData.globalData.draggedProduct = product;

  // Emulate dropping product to the category
  await categoryCard.get(0).props.onDrop();

  const wrapperAfterAdd = createWrapper();

  const updatedCategoryCard = findCategoryById(wrapperAfterAdd, categoryId).categoryCard;
  const updatedCategoryCardBadgeText = updatedCategoryCard.find('.badge').text().replace(',', '');
  const newProductCount = parseInt(updatedCategoryCardBadgeText);

//  console.log(productCount + ' ' + newProductCount);
  if (newProductCount !== productCount + 1) {
    throw new Error(`Category product count has not been increased: ${newProductCount} instead of ${productCount + 1}`);
  } else {
    console.log('Category product count increased when product assigned to the group');
  }
  it('Category product count increased', () => {
    expect(newProductCount).toBe(productCount + 1);
  });

  const updatedProduct = findProductById(wrapperAfterAdd, productId).product;
  const updatedCategoryIds = updatedProduct.categoryIds;
  const expectedCategoryIds = categoryIds.concat(categoryId);

  if (JSON.stringify(updatedCategoryIds) !== JSON.stringify(expectedCategoryIds)) {
    throw new Error(`Category ID has not been added to product: ${updatedCategoryIds} instead of ${expectedCategoryIds}`);
  } else {
    console.log('Category ID has been added to product');
  }
  it('Category ID has been added to product', () => {
    expect(JSON.stringify(updatedCategoryIds)).toBe(JSON.stringify(expectedCategoryIds));
  });

  // Try to add again - nothing should be changed
  // Emulate sropping product to the category
  await categoryCard.get(0).props.onDrop();

  const wrapperAfterAdd2 = createWrapper();
  const updatedCategoryCard2 = findCategoryById(wrapperAfterAdd2, categoryId).categoryCard;
  const updatedCategoryCardBadgeText2 = updatedCategoryCard2.find('.badge').text().replace(',', '');
  const newProductCount2 = parseInt(updatedCategoryCardBadgeText2);
  
//  console.log(newProductCount + ' ' + newProductCount2);
  if (newProductCount2 !== newProductCount) {
    throw new Error(`Category product count has been increased: ${newProductCount2} instead of ${newProductCount}`);
  } else {
    console.log('Category product count NOT increased when product assigned to the group which it already belongs to');
  }
  it('Category product count NOT increased when the same product added to category again', async () => {
    expect(newProductCount2).toBe(newProductCount);
  });


  const updatedProduct2 = findProductById(wrapperAfterAdd2, productId).product;
  const updatedCategoryIds2 = updatedProduct2.categoryIds;
  const expectedCategoryIds2 = [...updatedCategoryIds];

  if (JSON.stringify(updatedCategoryIds2) !== JSON.stringify(expectedCategoryIds2)) {
    throw new Error(`Category ID has been added AGAIN to product: ${updatedCategoryIds2} instead of ${expectedCategoryIds2}`);
  } else {
    console.log('Category ID has NOT been added to product again');
  }
  it('Category ID has NOT been added to product', () => {
    expect(JSON.stringify(updatedCategoryIds)).toBe(JSON.stringify(expectedCategoryIds));
  });
});

//-----------------------------------------------------------------------------
// Utility functions
//-----------------------------------------------------------------------------
function createWrapper() {
  const wrapper = mount(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
  return wrapper;
}

function findProductAndCategoryToAdd() {
  const wrapper = createWrapper();
  let productToAdd = null;
  let categoryToAdd = null;
  let categoryCardToAdd = null;

  for (let categoryId = 1; categoryId <= CATEGORY_COUNT; categoryId++) {
    const { categoryCard, category } = findCategoryById(wrapper, categoryId);
    for (let productId = 1; productId <= PRODUCT_COUNT; productId++) {
      const { product } = findProductById(wrapper, productId);
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
    categoryCard: categoryCardToAdd, 
    product: productToAdd, 
    category: categoryToAdd };
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
