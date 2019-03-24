import React, { Component } from "react";
import ProductList from "../../components/ProductList/ProductList";
import ProductItem from "../../components/ProductItem/ProductItem";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import apiCall from "./../../utils/apiCall";
import {actFetchProductsRequest} from './../../actions/index'; 

class ProductListPage extends Component {
  componentDidMount() {
   this.props.fetchAllProducts();
  }
  onDelete = (id) => {
    var {products} = this.state;
    apiCall("DELETE", `products/${id}`, null)
    .then(res => {
      if(res.status === 200) {
        var index = this.findIndex(products, id);
        if(index !== -1) {
          products.splice(index, 1);
          this.setState({
            products
          })
        }
      }
    })
  }
  findIndex = (products, id) => {
    var result = -1;
    products.map((product,index) => {
      if(product.id === id){
        result = index;
      }
    })
    return result;
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
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductListPage);
