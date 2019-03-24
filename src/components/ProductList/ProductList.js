import React, { Component } from 'react';

export default class ProductList extends Component {
  render() {
    return (
        <div className="card mt-2">
        <table className="table table-hover ">
          <thead className="thead-light">
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Mã</th>
              <th scope="col">Tên</th>
              <th scope="col">Giá</th>
              <th scope="col">Trạng Thái</th>
              <th scope="col">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {this.props.children}
          </tbody>
        </table>
      </div>
    )
  }
}
