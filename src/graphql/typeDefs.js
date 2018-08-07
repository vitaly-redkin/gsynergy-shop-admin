/**
 * GraphQL types.
 */
export default `
  type Product {
    id: Int!
    name: String!
    vendorName: String!
    vendorLocation: String!
    price: Decimal!
    description: String!
    categoryIds: [Int]!
  }

  type Category {
    id: Int!
    name: String!
    productCount: Int!
  }

  type Query {
    products: [Product]
    categories: [Category]
  }

  type Mutation {
    assignProductToCategory(productId: Int!, categoryId: Int!): Query
  }
`;
