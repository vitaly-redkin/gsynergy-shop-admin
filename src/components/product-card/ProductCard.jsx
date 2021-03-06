/**
 * Product card component.
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardFooter, Row, Col } from 'reactstrap';
import * as GlobalData from '../../util/GlobalData';
import './ProductCard.css';

class ProductCard extends PureComponent {
  render() {
    const product = this.props.product;
    return (
      <Card id={`productCard_${product.id}`}
            draggable 
            className='product-card p-0 m-2 mt-1 shadow-sm rounded draggable' 
            onDragStart={this.onDragStart} 
            onDragEnd={this.onDragEnd}
      >
        <CardBody className='m-0 p-0'>
          <div className='rounded-top product-card-body' 
               title={`Product assigned to such categories: ${JSON.stringify(product.categoryIds)}`} 
          >
          </div>
        </CardBody>
        <CardFooter className='pl-2 pr-2'>
          <Row>
            <Col className='product-card-name'>
              {product.name}
            </Col>
            <Col className='product-card-price text-right'>
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}
            </Col>
          </Row>    
          <Row>
            <Col className='product-card-vendor'>
              {product.vendorName + ', ' + product.vendorLocation}
            </Col>
          </Row>    
          <Row>
            <Col className='product-card-description'>
              {product.description}
            </Col>
          </Row>    
        </CardFooter>
      </Card>
    );
  }

  /**
   * DragStart event handler.
   * 
   * @param ev DragStart event
   */
  onDragStart = (ev) => {
    const product = this.props.product;
//    console.log(`Drag started: ${product.name}`);
    GlobalData.globalData.draggedProduct = product;
    ev.dataTransfer.setData('text/html', product.id + '');  
    ev.dataTransfer.effectAllowed = 'move';
  }

  /**
   * DragEnd event handler.
   * 
   * @param ev DragEnd event
   */
  onDragEnd = (ev) => {
    ev.preventDefault();
    GlobalData.globalData.draggedProduct = null;
  }
}

ProductCard.propTypes = {
  product: PropTypes.instanceOf(Object),
}

export default ProductCard;
