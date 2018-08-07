import React, { PureComponent } from 'react';
import { Container, Row, Col } from 'reactstrap';
import ProductPane from '../product-pane/ProductPane';
import CategoryPane from '../category-pane/CategoryPane';
import './App.css';

class App extends PureComponent {
  render() {
    return (
      <Container className='mw-100 pl-4 pr-4 pt-2 pb-2'>
        <Row>
          <Col className='app-search-bar pt-2 pb-2 text-center'>
            Search Bar Placeholder
          </Col>
        </Row>
        <Row className='app-container'>
          <Col className='col-9 app-column-left'>
            <ProductPane />
          </Col>
          <Col className='col-3 pl-1 pr-1 app-column-right'>
            <CategoryPane />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
