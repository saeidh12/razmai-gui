import React, { Component } from 'react';
import MapItem from './MapItem'

class PickMap extends Component {
  mapClicked(mapgraph) {
    this.props.pickedmap(mapgraph)
  }

  render() {
    let maps = Object.entries(this.props.maps)
    let mapItems = maps.map((mapgraph) => {
      return (
        <MapItem key={ mapgraph[0] } mapgraph={ mapgraph } clicked={this.mapClicked.bind(this)}/>
      )
    })
    return (
      <div className="my-form">
        <h2>Choose the Map</h2>
        <ul className="list-group">
        { mapItems }
        </ul>
      </div>
    );
  }
}
export default PickMap;
