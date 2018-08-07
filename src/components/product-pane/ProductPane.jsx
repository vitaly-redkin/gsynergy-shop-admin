/**
 * product pain component.
 * 
 * Contains both a presentational and container component - 
 * the later one wraps the former one with GraphQL Query component.
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CardDeck } from 'reactstrap';
import { Query } from 'react-apollo';
import * as Queries from '../../graphql/queries';
import ProductCard from '../product-card/ProductCard';
import './ProductPane.css';

/**
 * Presentational product pane component.
 */
class ProductPane extends PureComponent {
  render() {
    const {products, loading, error} = this.props;
    if (error) {
      return (
        <div>{`Error: ${error}`}</div>
      );
    }
    else if (loading || !products) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <CardDeck className='pl-1 pr-1 pt-1 pb-2 product-pane-container'>
        {
          products.map((product) => <ProductCard key={product.id} product={product} />)
        }
      </CardDeck>
    );
  }
}

ProductPane.propTypes = {
  products: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  loading: PropTypes.bool,
  error: PropTypes.string,
}

/**
 * GraphQL wrapper (container component).
 */
const ProductPaneWithData = () => (
  <Query query={Queries.productsQuery}>
    {({ data: { products, loading, error } }) => 
      <ProductPane products={products} loading={loading} error={error} />
    }
  </Query>
);

export default ProductPaneWithData;

