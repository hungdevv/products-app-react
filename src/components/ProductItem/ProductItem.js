import React, { Component } from "react";
import {Link} from "react-router-dom";
export default class ProductItem extends Component {
  onDelete = (id) =>{
    if(confirm("Xóa?")){ //eslint-disable-line
     this.props.onDelete(id);
    }
  }
  render() {
  
    var { product, index } = this.props;
    var statusName = product.status ? "Con hang" : "full";
    var statusClass = product.status ? "success" : "danger";
    return (
      <tr>
        <th scope="row">{index + 1}</th>
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td>{product.price}$</td>
        <td>
          <span className={`badge badge-${statusClass}`}>{statusName}</span>
        </td>
        <td>
          <div className="btn-group">
            <Link className="btn btn-warning" to={`${product.id}/edit`}>
              Sửa
            </Link>
            <button 
            className="btn btn-danger" 
            type="button"
            onClick={() => this.onDelete(product.id)} 
            >
              Xóa
            </button>
          </div>
        </td>
      </tr>
    );
  }
}
