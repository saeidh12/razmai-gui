import React, { Component } from 'react';

class MapItem extends Component {
  mapClicked(mapgraph) {
    this.props.clicked(mapgraph)
  }

  render() {
    return (
      <li className="list-group-item d-flex justify-content-between align-items-center"
        onClick={this.mapClicked.bind(this, this.props.mapgraph)}>
        {this.props.mapgraph[0]}
        <span className="badge badge-info badge-pill">{this.props.mapgraph[1]["Number_of_players"]}</span>
      </li>
    );
  }
}
export default MapItem;
