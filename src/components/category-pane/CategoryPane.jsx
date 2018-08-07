/**
 * Category pain component.
 * 
 * Contains both a presentational and container component - 
 * the later one wraps the former one with GraphQL Query component.
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import { Query } from 'react-apollo';
import * as Queries from '../../graphql/queries';
import CategoryCard from '../category-card/CategoryCard';
import './CategoryPane.css';

/**
 * Presentational category pane component.
 */
class CategoryPane extends PureComponent {
  render() {
    const {categories, loading, error} = this.props;
    if (error) {
      return (
        <div>{`Error: ${error}`}</div>
      );
    }
    else if (loading) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <Container className='pt-2 pb-2 pl-1 pr-1 category-pane-container'>
        {
          categories.map((category) => <CategoryCard key={category.id} category={category} />)
        }
      </Container>
    );
  }
}

CategoryPane.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  loading: PropTypes.bool,
  error: PropTypes.string,
}

/**
 * GraphQL wrapper (container component).
 */
const CategoryPaneWithData = () => (
  <Query query={Queries.categoriesQuery}>
    {({ data: { categories, loading, error } }) => 
      <CategoryPane categories={categories} loading={loading} error={error} />
    }
  </Query>
);

export default CategoryPaneWithData;
