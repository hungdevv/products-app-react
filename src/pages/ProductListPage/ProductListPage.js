import React, { Component } from "react";
import ProductList from "../../components/ProductList/ProductList";
import ProductItem from "../../components/ProductItem/ProductItem";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {actFetchProductsRequest, actDeleteProductsRequest} from './../../actions/index'; 

class ProductListPage extends Component {
  componentDidMount() {
   this.props.fetchAllProducts();
  }
  onDelete = (id) => {
    this.props.deleteProducts(id);
  }
  showProduct = products => {
    var result = null;
    if (products.length > 0) {
      result = products.map((product, index) => {
        return <ProductItem 
        key={product.id} 
        product={product} 
        index={index}
        onDelete={this.onDelete} />;
      });
    }
    return result;
  };
  render() {
    var {products} = this.props;

    return (
      <div>
        <Link to="/product/add" class="btn btn-primary">
          {"Thêm sản phẩm"}
        </Link>
        <ProductList>{this.showProduct(products)}</ProductList>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    products: state.products
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return{
    fetchAllProducts: () => {
      dispatch(actFetchProductsRequest());
    },
    deleteProducts: (id) => {
      dispatch(actDeleteProductsRequest(id));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductListPage);
