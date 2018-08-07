/**
 * Category card component.
 * 
 * Contains both a presentational and container component - 
 * the later one wraps the former one with GraphQL Mutation component.
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from "react-apollo";
import { Card, CardBody, Row, Col, Badge } from 'reactstrap';
import * as Numeral from 'numeral';
import * as Queries from '../../graphql/queries';
import * as GlobalData from '../../util/GlobalData';
import * as Types from '../../util/Types';
import './CategoryCard.css';

/**
 * Presentational category pane component.
 */
class CategoryCard extends PureComponent {
  render() {
    const category = this.props.category;
    return (
      <Card className='category-card mb-2 ml-0 shadow-sm rounded droppable '
            onDragOver={this.onDragOver}
            onDrop={this.onDrop}>
        <CardBody className='ml-1 pb-2 pt-2'>
          <Row>
            <Col className='col-2 pl-0 pr-0'>
              <div className='category-card-image rounded' />
            </Col>
            <Col className='col-8 pl-0 pr-0'>
              {category.name}
            </Col>
            <Col className='col-2 pl-0 pr-0 text-right'>
              <Badge className='badge-danger category-product-count p-1'>
                {Numeral(category.productCount).format('0,0')}
              </Badge>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }

  /**
   * Returns true of the given product can be assigned to the current category.
   * 
   * @param {Product} product Product to check
   */
  canAssignProductToCategory(product) {
    // Check if the product does not already belong to the current category
    return (product !== null && product.categoryIds.indexOf(this.props.category.id) < 0);
  }

  /**
   * Assigns the gicen product to the current category.
   * 
   * @param {Product} product Product to assign
   */
  assignProductToCategory(product) {
    const mutationPayload = { variables: { 
      productId: product.id, 
      categoryId: this.props.category.id 
    } };
    this.props.assignProductToCategory(mutationPayload);
  }

  /**  
   * Returns value to set the dataTransfer.dropEffect with
   * depending on the current card and dragged product.
   */
  getDropEffect = () => {
    const product = GlobalData.globalData.draggedProduct;
    const canBeDropped = this.canAssignProductToCategory(product);
    const result = (canBeDropped ? 'move' : 'none');
//    console.log(result + ' ' + (product != null ? product.id : '?') + ' ' + this.props.category.id);
    return result;
  }

  /**
   * Event handler for the DragOver event.
   * 
   * @param ev DragOver event object
   */
  onDragOver = (ev) => {
    ev.preventDefault();
    const dropEffect = this.getDropEffect();;
    ev.dataTransfer.dropEffect = dropEffect;
  }

  /**
   * Event handler for the Drop event.
   * 
   * @param ev DragOver event object
   */
  onDrop = () => {
    const product = GlobalData.globalData.draggedProduct;
//    console.log(`Dropped: ${product.id} on ${this.props.category.name}`);
    if (this.canAssignProductToCategory(product)) {
      this.assignProductToCategory(product);
    }
  }
}

CategoryCard.propTypes = {
  product: PropTypes.instanceOf(Types.Category),
  assignProductToCategory: PropTypes.func,
}

/**
 * GraphQL wrapper (container component).
 */
const CategoryCardWithData = ({category}) => {
  return (
    <Mutation mutation={Queries.assignProductToCategoryMutation}>
      {(assignProductToCategory) => (
        <CategoryCard assignProductToCategory={assignProductToCategory} category={category} />
      )}
    </Mutation>
  );
};

export default CategoryCardWithData;
