import React, { Component } from 'react';
import { Route, Link} from 'react-router-dom';

const menus = [
  {
    name: 'Trang chủ',
    to: '/',
    exact: true
  },
  {
    name: 'Sản Phẩm',
    to: '/product/list',
    exact: false
  },
  {
    name: 'Thêm sản phẩm',
    to: '/product/add',
    exact: false
  }
];

const MenuLink = ({label, to, activeOnlyWhenExact}) => {
  return(
    <Route
      path={to}
      exact={activeOnlyWhenExact}
      children={({match}) => {
        var active = match ? 'active' : '';
        return (
          <li className={`nav-item ${active}`}>
            <Link to={to} className="nav-link">
              {label}
            </Link>
          </li>
        )
      }}

    />
  )
}


export default class Menu extends Component {
  showMenus = (menus) => {
    var result = null;
    if(menus.length > 0) {
      result = menus.map((menu, index) => {
       return(
        <MenuLink
        key={index}
        label={menu.name}
        to={menu.to}
        activeOnlyWhenExact={menu.exact}
      />
       )
      })
    }
    return result;
  }
  render() {
    return (
        <nav className="navbar navbar-expand-md bg-dark navbar-dark mb-2">
        {/* Brand */}
        <a className="navbar-brand" >Navbar</a>
        {/* Toggler/collapsibe Button */}
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
          <span className="navbar-toggler-icon" />
        </button>
        {/* Navbar links */}
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav">
            {this.showMenus(menus)}
          </ul>
        </div>
      </nav>
    )
  }
}
