import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Menu extends Component {
  render() {
    return (
      <div className=" menu row justify-content-sm-center no-gutters text-center">
        <h2 className="color-p2">Menu</h2>
        <div className="w-100"></div>
        <Link className="btn btn-sm btn-block btn-info" to={{
          pathname: '/play',
        }}>Play</Link>
        <div className="w-100"></div>
        <Link className="btn btn-sm btn-block btn-info" to={{
          pathname: '/build-map',
        }}>Build Map</Link>
        <div className="w-100"></div>
      </div>
    );
  }
}
export default Menu;
