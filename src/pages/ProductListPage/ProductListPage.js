import React, { Component } from "react";
import ProductList from "../../components/ProductList/ProductList";
import ProductItem from "../../components/ProductItem/ProductItem";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  actFetchProductsRequest,
  actDeleteProductsRequest,
  actSortProducts,
  actSortProductsRequest
} from "./../../actions/index";

class ProductListPage extends Component {
  componentDidMount() {
    this.props.fetchAllProducts();
  }
  onDelete = id => {
    this.props.deleteProducts(id);
  };

  sortName = (products, status) => {
    products.sort((a, b) => {
      var nameA = a.name.toUpperCase();
      var nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -status;
          }
          if (nameA > nameB) {
            return status;
          }
          return 0;
    });
    this.setState(products.sort());
  };
  sortPrice = (products, status) => {
    products.sort((a, b) => {
      var PriceA = parseInt(a.price)
      var PriceB = parseInt(b.price)
          if (PriceA < PriceB) {
            return -status;
          }
          if (PriceA > PriceB) {
            return status;
          }
          return 0;
    });
    this.setState(products.sort());
  };
  sortStatus = () => {
    this.props.onSortProducts();
  }


  showProduct = products => {
    var result = null;
    if (products.length > 0) {
      result = products.map((product, index) => {
        return (
          <ProductItem
            key={product.id}
            product={product}
            index={index}
            onDelete={this.onDelete}
          />
        );
      });
    }
    return result;
  };
  render() {
    var { products } = this.props;

    return (
      <div>
        <div className="input-group mb-3">
          <Link to="/product/add" class="btn btn-primary mr-auto">
            {"Thêm sản phẩm"}
          </Link>
          <div className="input-group-primaty">
            <button
              className="btn btn-outline-primary dropdown-toggle"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Sắp xếp
            </button>
            <div className="dropdown-menu">
              <button
                className="dropdown-item"
                onClick={() => this.sortName(products, 1)}
              >
                Tên A -> Z
              </button>
              <button
                className="dropdown-item"
                onClick={() => this.sortName(products, -1)}
              >
                Tên Z -> A
              </button>
              <button className="dropdown-item"onClick={() => this.sortPrice(products, 1)}>Giá tăng</button>
              <button className="dropdown-item"onClick={() => this.sortPrice(products, -1)}>Giá giảm</button>
              <button className="dropdown-item"onClick={() => this.sortStatus()}>Còn hàng</button>
            </div>
          </div>
        </div>

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
  return {
    fetchAllProducts: () => {
      dispatch(actFetchProductsRequest());
    },
    deleteProducts: id => {
      dispatch(actDeleteProductsRequest(id));
    },
    onSortProducts: () => {
      dispatch(actSortProductsRequest());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductListPage);
