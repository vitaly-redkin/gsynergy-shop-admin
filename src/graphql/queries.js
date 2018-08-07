/**
 * GraphQL queries, mutations and fragments used in the application.
 */
import gql from 'graphql-tag';

/**
 * Query to return the full list of products.
 */
export const productsQuery = gql`
{
  products @client {
    id
    name
    vendorName
    vendorLocation
    price
    description
    categoryIds
  }
}
`;

/**
 * Query to return the full list of categories.
 */
export const categoriesQuery = gql`
{
  categories @client {
    id
    name
    productCount
  }
}
`;

/**
 * Mutation to assign a product to a category.
 */
export const assignProductToCategoryMutation = gql`
  mutation assignProductToCategoryMutation($productId: Int!, $categoryId: Int!) {
    assignProductToCategoryMutation(productId: $productId, categoryId: $categoryId) @client
  }
`;

/**
 * Fragment to return list of categories the product is assgned to.
 */
export const productCategoriesFragment = gql`
fragment productCategoriesFragment on Product {
  categoryIds
}
`;

/**
 * Fragment to return the number of products in the categoty.
 */
export const categoryProductCountFragment = gql`
  fragment categoryProductCountFragment on Category {
    productCount
  }
`;

