import React, { Component } from "react";
import apiCall from "./../../utils/apiCall";
import {
  actAddProductsRequest,
  actEditProductsRequest,
  actUpdateProductsRequest
} from "../../actions";
import { connect } from "react-redux";

class ProductActionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      price: "",
      status: ""
    };
  }

  componentDidMount() {
    var { match } = this.props;
    if (match) {
      var id = match.params.id;
      this.props.onEdit(id);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.edit) {
      var { edit } = nextProps;
      var { id, name, price, status } = edit;
      this.setState({
        id,
        name,
        price,
        status
      });
    }
  }
  onChange = event => {
    var target = event.target;
    var name = target.name;
    var value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({
      [name]: value
    });
  };
  onSave = e => {
    var { id, name, price, status } = this.state;
    var { history } = this.props;
    var product = {
      id,
      name,
      price,
      status
    };
    e.preventDefault();
    if (id) {
      this.props.onUpdate(product);
      history.push("/product/list");
    } else {
      this.props.onAdd(product);
      history.goBack();
    }
  };
  render() {
    var { name, price, status } = this.state;
    return (
      <div className="col-6">
        <form onSubmit={this.onSave}>
          <div className="form-group">
            <label>Tên sản phẩm:</label>
            <input
              onChange={this.onChange}
              type="text"
              value={name}
              name="name"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Giá:</label>
            <input
              onChange={this.onChange}
              type="text"
              name="price"
              value={price}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Trạng thái:</label>
          </div>
          <div className="checkbox">
            <input
              type="checkbox"
              onChange={this.onChange}
              value={status}
              name="status"
              checked={status}
            />{" "}
            Còn hàng
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

const mapStateToProps = state => {
  return {
    edit: state.edit
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onAdd: product => {
      dispatch(actAddProductsRequest(product));
    },
    onEdit: id => {
      dispatch(actEditProductsRequest(id));
    },
    onUpdate: id => {
      dispatch(actUpdateProductsRequest(id));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductActionPage);
