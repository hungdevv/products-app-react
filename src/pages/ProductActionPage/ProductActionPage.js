import React, { Component } from "react";
import apiCall from './../../utils/apiCall';
import { actAddProductsRequest } from "../../actions";
import {connect} from 'react-redux';

class ProductActionPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: '',
      name: '',
      price: '',
      status: ''
    };
  }

  componentDidMount(){
    var {match} = this.props;
    if(match) {
      var id = match.params.id
      apiCall("GET",`products/${id}`, null)
      .then(res =>{
        var {id, name, price, status} = res.data
        this.setState({
          id,
          name,
          price,
          status
        })
      })
    }
  }
  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({
      [name]: value
    });
  }
  onSave = (e) => {
    var {id,name, price, status} = this.state;
    var { history } = this.props;
    var product = {
      id,
      name,
      price,
      status
    }
    e.preventDefault();
    if(id) {
      apiCall("PUT", `products/${id}`, {
        name,
        price,
        status
      }).then(res => {
        history.push("/product/list");
      })
    }else{
      this.props.onAdd(product);
      history.goBack();
    }
  }
  render() {
 
    var {name, price, status} = this.state;
    return (
      <div className="col-6">
        <form onSubmit ={this.onSave}>
          <div className="form-group">
            <label htmlFor>Tên sản phẩm:</label>
            <input
              onChange={this.onChange}
              type="text"
              value={name}
              name="name"
              id
              className="form-control"
              placeholder
              aria-describedby="helpId"
            />
          </div>
          <div className="form-group">
            <label htmlFor>Giá:</label>
            <input
              onChange={this.onChange}
              type="text"
              name="price"
              value={price}
              id
              className="form-control"
              placeholder
              aria-describedby="helpId"
            />
          </div>
          <div className="form-group">
            <label htmlFor>Trạng thái:</label>
          </div>
          <div className="checkbox">
            <input type="checkbox" onChange={this.onChange} value={status} name="status" checked={status}/> Còn hàng
          </div>
          <div className="mt-4">
          <button type="submit" className="btn btn-primary">
            Lưu
          </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return{
    onAdd: (product) => {
      dispatch(actAddProductsRequest(product))
    }
  }
}
export default connect(null, mapDispatchToProps)(ProductActionPage)
