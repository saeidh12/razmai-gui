import React, { Component } from 'react';

class PickAIs extends Component {
  validateandSetPlayers(e) {
    let players = [];
    let teams   = [];
    for (let i = 0; i < this.props.numberofPlayers; i++)
      teams.push([])
    for (let i = 0; i < this.props.numberofPlayers; i++) {
      players.push({
        Name:          this.refs["p" + i + "Name"].value,
        Team_index:    parseInt(this.refs["p" + i + "Team"].value, 10),
        Player_index:  i,
        Code_name:     this.refs["p" + i + "AI"].value,
      });
      teams[players[i].Team_index].push(i);
    }
    this.props.playersANDteams(players, teams);
    e.preventDefault();
  }

  render() {
    let teams = [];
    for (let i = 0; i < this.props.numberofPlayers; i++) {
      teams.push(<option key={i} value={i}>{i}</option>);
    }
    let ais = this.props.ais.map(ai => (<option key={ai} value={ai}>{ai}</option>))
    let playerforms = [];
    for (let i = 0; i < this.props.numberofPlayers; i++) {
      playerforms.push(
        <div className="my-form" key={i}>
          <h3> Player {i} </h3>
          <div className="input-group mb-3 no-gutters">
            <input className="form-control col-sm-6"
              placeholder={"Player " + i + "s Name"}
              type="text"
              ref={"p" + i + "Name"}/>
            <div className="input-group-append col-sm-6 no-gutters">
              <select className="custom-select col-sm-6" ref={"p" + i + "Team"} required>
                <option value="">team</option>
                { teams }
              </select>
              <select className="custom-select col-sm-6" ref={"p" + i + "AI"} required>
                <option value="">ai</option>
                { ais }
              </select>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="my-form">
        <h2>Set Players</h2>
        <form onSubmit={this.validateandSetPlayers.bind(this)}>
        { playerforms }
        <input className="btn btn-sm btn-block btn-info" type="submit" value="submit"/>
        </form>
      </div>
    );
  }
}
export default PickAIs;
