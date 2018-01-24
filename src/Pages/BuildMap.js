import React, { Component } from 'react';
import Graph from "react-graph-vis";

import CSS_COLOR_NAMES from '../Variables/Colors';
import OPTION0 from '../Variables/GraphOptions';

import BaseForm from '../Components/BaseForm';
import EdgeForm from '../Components/EdgeForm';
import SaveMapForm from '../Components/SaveMapForm';
import MapFromFile from '../Components/MapFromFile';

class BuildMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Map: {
        Number_of_players: 0,
        Weak_delimiter:    5,
        Medium_delimiter:  10,
        Conquer_bonus:     4,
        Bases:             [],
        Edges:             [],
      },
      selectedNode: null,
      selectedEdge: null,
    };
  }

  SelectNode(event) {
    var { nodes } = event;
    this.setState({selectedNode: nodes[0]});
  }

  DeselectNode(event) {
    var { nodes } = event;
    if (nodes.length > 0) {
      this.setState({selectedNode: nodes[0]});
    } else {
      this.setState({selectedNode: null});
    }
  }

  SelectEdge(event) {
    var { edges } = event;
    this.setState({selectedEdge: edges[0].split(" ").map((item) => parseInt(item, 10))});
  }

  DeselectEdge(event) {
    var { edges } = event;
    if (edges.length > 0) {
      this.setState({selectedEdge: edges[0].split(" ").map((item) => parseInt(item, 10))});
    } else {
      this.setState({selectedEdge: null});
    }
  }

  GraphNodes() {
    return this.state.Map.Bases.map((base, index) => {
      return {color: CSS_COLOR_NAMES[base.Occupying_player + 1], id: index, label: index.toString(), x: base.X, y:base.Y} //base.Troop_count.toString() + "\n" +
    })
  }

  GraphEdges() {
    var edges = [];
    // eslint-disable-next-line
    this.state.Map.Bases.map((base, index) => {
      for (var i = 0; i < base.Connections.length; i++) {
        if (base.Connections[i] > index)
        edges.push({id:index.toString() + " " + base.Connections[i].toString() ,from: index, to: base.Connections[i]})
      }
    });
    return edges;
  }

  render() {
    var map_from_file  = <MapFromFile Map={(Map) => this.setState({Map:Map})}/>
    var save_map       = <SaveMapForm  Map={this.state.Map}/>
    var create_base    = <BaseForm
      newMap={(Map) => this.setState({Map:Map})}
      Map={this.state.Map}
      isCreate={true}
      defaultOccupyingPlayer={1}
      defaultTroopCount={0}
      defaultAttackBonus={1}
      defaultDefenseBonus={1}
      defaultTroopBonus={2}
      defaultX={0}
      defaultY={0}
    />;

    var edit_base;
    if (this.state.selectedNode != null) {
      var base = this.state.Map.Bases[this.state.selectedNode];
      edit_base = <BaseForm
        newMap={(Map) => this.setState({Map:Map})}
        newMapRemoveBase={(Map) => this.setState({Map:Map,selectedNode: null})}
        Map={this.state.Map}
        isCreate={false}
        defaultOccupyingPlayer={base.Occupying_player}
        defaultTroopCount={base.Troop_count}
        defaultAttackBonus={base.Attack_bonus}
        defaultDefenseBonus={base.Defense_bonus}
        defaultTroopBonus={base.Troop_bonus}
        defaultX={base.X}
        defaultY={base.Y}
        selectedNode={this.state.selectedNode}
      />;
    }

    var create_edge = <EdgeForm
      newMap={(Map) => this.setState({Map:Map})}
      Map={this.state.Map}
      isCreate={true}
    />;

    var edit_edge;
    if (this.state.selectedEdge != null) {
      edit_edge = <EdgeForm
        newMap={(Map) => this.setState({Map:Map})}
        newMapRemoveEdge={(Map) => this.setState({Map:Map,selectedEdge: null})}
        Map={this.state.Map}
        isCreate={false}
        selectedEdge={this.state.selectedEdge}
      />;
    }

    var graph = {
      nodes: this.GraphNodes(),
      edges: this.GraphEdges(),
    };

    var options = OPTION0;

    var events = {
      selectNode:    this.SelectNode.bind(this),
      deselectNode:  this.DeselectNode.bind(this),
      selectEdge:    this.SelectEdge.bind(this),
      deselectEdge:  this.DeselectEdge.bind(this)
    }
    return (
      <div className="row">
        { save_map }
        { map_from_file }
        <div className="w-100"></div>
        <Graph className="col-sm-12" graph={graph} options={options} events={events}/>
        <div className="w-100"></div>
        { create_base }
        { edit_base }
        <div className="w-100"></div>
        { create_edge }
        { edit_edge }
      </div>
    );
  }
}
export default BuildMap;
