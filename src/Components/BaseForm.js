import React, { Component } from 'react';

class BaseForm extends Component {
  CheckandFixOccupyingPlayer(Player, Map) {
    if (Player === -1) {
      return Map
    }
    for (var i = 0; i < Map.Bases.length; i++) {
      if (Map.Bases[i].Occupying_player === Player) {
        return Map
      }
    }

    var max = 0;
    for (i = 0; i < Map.Bases.length; i++) {
      if (Map.Bases[i].Occupying_player > Player) {
        Map.Bases[i].Occupying_player--;
      }
      if (Map.Bases[i].Occupying_player > max) {
        max = Map.Bases[i].Occupying_player;
      }
    }
    Map.Number_of_players = max + 1;
    return Map
  }

  CreateBase(e) {
    var newMap = this.props.Map;
    newMap.Bases.push({
      Occupying_player: parseInt(this.newBaseOccupying_player.value, 10),
      Troop_count:      parseInt(this.newBaseTroop_count.value, 10),
      Attack_bonus:     parseFloat(this.newBaseAttack_bonus.value, 10),
      Defense_bonus:    parseFloat(this.newBaseDefense_bonus.value, 10),
      Troop_bonus:      parseInt(this.newBaseTroop_bonus.value, 10),
      Connections:      [],
      X:                parseInt(this.newBaseX.value, 10),
      Y:                parseInt(this.newBaseY.value, 10),
    });
    if (this.newBaseOccupying_player.value + 1 > newMap.Number_of_players) {
      newMap.Number_of_players++;
    }
    this.props.newMap(newMap);
    e.preventDefault();
  }

  EditBase(e) {
    var oldOccupyingPlayer = this.props.Map.Bases[this.props.selectedNode].Occupying_player;
    var newMap = this.props.Map;
    var editedBase = {
      Occupying_player: this.editBaseOccupying_player.value,
      Troop_count:      this.editBaseTroop_count.value,
      Attack_bonus:     this.editBaseAttack_bonus.value,
      Defense_bonus:    this.editBaseDefense_bonus.value,
      Troop_bonus:      this.editBaseTroop_bonus.value,
      Connections:      this.props.Map.Bases[this.props.selectedNode].Connections,
      X:                this.editBaseX.value,
      Y:                this.editBaseY.value,
    };
    newMap.Bases[this.props.selectedNode] = editedBase;
    if (this.editBaseOccupying_player.value === newMap.Number_of_players) {
      newMap.Number_of_players++;
    }

    this.props.newMap(this.CheckandFixOccupyingPlayer(
      oldOccupyingPlayer,
      newMap
    ));
    e.preventDefault();
  }

  RemoveBase(e) {
    var newMap = this.props.Map;
    var oldOccupyingPlayer = this.props.Map.Bases[this.props.selectedNode].Occupying_player
    newMap.Bases.splice(this.props.selectedNode, 1);
    for (var i = 0; i < newMap.Bases.length; i++) {
      var index = newMap.Bases[i].Connections.indexOf(this.props.selectedNode);
      if (index >= 0) {
        newMap.Bases[i].Connections.splice(index, 1);
      }
    }
    this.props.newMapRemoveBase(this.CheckandFixOccupyingPlayer(
      oldOccupyingPlayer,
      newMap
    ));
    e.preventDefault();
  }

  render() {
    var formTitle = this.props.isCreate ? "Create Base": "Edit Base " + this.props.selectedNode.toString();

    var formButton = this.props.isCreate ? "create": "edit";

    var removeBase;
    if (!this.props.isCreate && this.props.selectedNode === this.props.Map.Bases.length -1) {
      removeBase = (
        <button className="btn btn-sm btn-block btn-warning" onClick={ this.RemoveBase.bind(this) }>remove</button>
      )
    }

    var team_options = [];
    for (let i = -1; i <= this.props.Map.Number_of_players; i++) {
      team_options.push(<option key={i} value={i}>{i}</option>);
    }

    var submitFuntion = this.props.isCreate ? this.CreateBase.bind(this): this.EditBase.bind(this);

    return (
      <div className="my-form col-sm-12 col-md-6">
        <h2>{ formTitle }</h2>
        <form onSubmit={ submitFuntion }>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text">Occupying Player</label>
            </div>
            <select className="custom-select"
              defaultValue={ this.props.defaultOccupyingPlayer }
              ref={(input) => {
                if (this.props.isCreate) {
                  this.newBaseOccupying_player = input;
                } else {
                  this.editBaseOccupying_player = input;
                }
              }}>
              { team_options }
            </select>
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text">Troop Count</label>
            </div>
            <input className="form-control"
              defaultValue={ this.props.defaultTroopCount }
              type="number"
              min="0"
              ref={(input) => {
                if (this.props.isCreate) {
                  this.newBaseTroop_count = input;
                } else {
                  this.editBaseTroop_count = input;
                }
              }}/>
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text">Attack Bonus</label>
            </div>
            <input className="form-control"
              defaultValue={ this.props.defaultAttackBonus }
              type="number"
              step="0.1"
              min="0"
              ref={(input) => {
                if (this.props.isCreate) {
                  this.newBaseAttack_bonus = input;
                } else {
                  this.editBaseAttack_bonus = input;
                }
              }}/>
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text">Defense Bonus</label>
            </div>
            <input className="form-control"
              defaultValue={ this.props.defaultDefenseBonus }
              type="number"
              step="0.1"
              min="0"
              ref={(input) => {
                if (this.props.isCreate) {
                  this.newBaseDefense_bonus = input;
                } else {
                  this.editBaseDefense_bonus = input;
                }
              }}/>
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text">Troop Bonus</label>
            </div>
            <input className="form-control"
              defaultValue={ this.props.defaultTroopBonus }
              type="number"
              min="0"
              ref={(input) => {
                if (this.props.isCreate) {
                  this.newBaseTroop_bonus = input;
                } else {
                  this.editBaseTroop_bonus = input;
                }
              }}/>
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text">x</label>
            </div>
            <input className="form-control"
              defaultValue={ this.props.defaultX }
              type="number"
              ref={(input) => {
                if (this.props.isCreate) {
                  this.newBaseX = input;
                } else {
                  this.editBaseX = input;
                }
              }}/>
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text">y</label>
            </div>
            <input className="form-control"
              defaultValue={ this.props.defaultY }
              type="number"
              ref={(input) => {
                if (this.props.isCreate) {
                  this.newBaseY = input;
                } else {
                  this.editBaseY = input;
                }
              }}/>
          </div>
          <input className="btn btn-sm btn-block btn-info" type="submit" value={ formButton }/>
        </form>
        { removeBase }
      </div>
    );
  }
}
export default BaseForm;
