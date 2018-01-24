import React, { Component } from 'react';

class EdgeForm extends Component {
  CreateEdge(e) {
    var node_a = parseInt(this.refs["base_from"].value, 10);
    var node_b = parseInt(this.refs["base_to"].value, 10);
    var newMap = this.props.Map;
    if (newMap.Bases[node_a].Connections.indexOf(node_b) < 0) {
      newMap.Bases[node_a].Connections.push(node_b)
    }
    if (newMap.Bases[node_b].Connections.indexOf(node_a) < 0) {
      newMap.Bases[node_b].Connections.push(node_a)
    }
    this.props.newMap(newMap);
    e.preventDefault();
  }

  RemoveEdge(e) {
    var node_a = this.props.selectedEdge[0];
    var node_b = this.props.selectedEdge[1];
    var newMap = this.props.Map;
    var index_b = newMap.Bases[node_a].Connections.indexOf(node_b);
    if (index_b >= 0) {
      newMap.Bases[node_a].Connections.splice(index_b, 1);
    }
    var index_a = newMap.Bases[node_b].Connections.indexOf(node_a);
    if (index_a >= 0) {
      newMap.Bases[node_b].Connections.splice(index_a, 1);
    }
    this.props.newMapRemoveEdge(newMap);
    e.preventDefault();
  }

  render() {
    if (this.props.isCreate) {
      var bases_options = [];
      for (let i = 0; i < this.props.Map.Bases.length; i++) {
        bases_options.push(<option key={i} value={i}>{i}</option>);
      }
      return (
        <div className="my-form col-sm-12 col-md-6">
          <h2>Create Edge</h2>
          <form onSubmit={this.CreateEdge.bind(this)}>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text">Base A</label>
              </div>
              <select ref="base_from" className="custom-select">
                { bases_options }
              </select>
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text">Base B</label>
              </div>
              <select ref="base_to" className="custom-select">
                { bases_options }
              </select>
            </div>
            <input className="btn btn-sm btn-block btn-info" type="submit" value="create"/>
          </form>
        </div>
      );
    } else {
      return (
        <div className="my-form col-sm-12 col-md-6">
          <h2>Remove Edge</h2>
          <form onSubmit={this.RemoveEdge.bind(this)}>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text">Base A</label>
              </div>
              <p>{ this.props.selectedEdge[0] }</p>
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text">Base B</label>
              </div>
              <p>{ this.props.selectedEdge[1] }</p>
            </div>
            <input readonly className="btn btn-sm btn-block btn-info" type="submit" value="remove"/>
          </form>
        </div>
      )
    }
  }
}
export default EdgeForm;
