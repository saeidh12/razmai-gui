import React, { Component } from 'react';
import axios from 'axios';
import Graph from "react-graph-vis";
import CSS_COLOR_NAMES from '../Variables/Colors';
import OPTION0 from '../Variables/GraphOptions';

class PlayGame extends Component {
  constructor(props) {
    super(props);
    this.state            = {
      turn: 0,
      pause_text:             'Play'
    };
    this.game             = {
        Turns:       [this.props.map[1],],
        Players:     this.props.players,
        Teams:       this.props.teams,
        Time_limit:  this.props.timeLimit,
    };
    this.game_specs_queue = [
      {
        player_leader_board: [],
        team_leader_board:   [],
        Player_turn: 0,
        game_ended:  false,
      },
    ];
    this.view_specs = {
      paused:      true,
      delay_time:  1500,
    };
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return false
  // }

  PlayTurn() {
    const post_data = {
      game: this.game,
      Player_turn: this.game_specs_queue[this.game_specs_queue.length - 1].Player_turn,
    }
    axios.post(this.props.server + '/play-turn', post_data)
      .then( (response) => {
        var nextPlayer = this.game_specs_queue[this.game_specs_queue.length - 1].Player_turn + 1;
        if (nextPlayer === this.game.Turns[0].Number_of_players) {
          nextPlayer = 0;
        }
        this.game_specs_queue.push({
          player_leader_board: response.data.player_leader_board,
          team_leader_board:   response.data.team_leader_board,
          Player_turn:         nextPlayer,
          game_ended:          response.data.game_ended,
        });
        this.game.Turns.push(response.data.newturn)
        if(!response.data.game_ended) {
          this.PlayTurn();
        } else {

        }
      })
      .catch( (error) => {
        console.log(error);
        alert(error);
      });
  }

  ResetMap() {
    this.view_specs.paused = true;
    this.setState({
      turn: 0
    });
  }

  componentDidMount() {
    this.PlayTurn();
  }

  PauseToggle() {
    if(!this.game_specs_queue[this.state.turn].game_ended) {
      this.view_specs.paused = !this.view_specs.paused;
      this.setState({pause_text : this.view_specs.paused ? 'Play' : 'Pause'});
      if (!this.view_specs.paused) {
        this.DisplayNextTurn();
      }
    }
  }

  DisplayNextTurn() {
    setTimeout(() => {
      if (!this.view_specs.paused && !this.game_specs_queue[this.state.turn].game_ended) {
        this.NextMove();
        this.DisplayNextTurn();
      }
      else {
        this.view_specs.paused = true;
        this.setState({pause_text : this.view_specs.paused ? 'Play' : 'Pause'});
      }
    }, this.view_specs.delay_time.value);
  }

  NextMove() {
    const turn = this.state.turn + 1;
    if (turn >= 0 && turn < this.game_specs_queue.length)
      this.setState({turn: turn});
  }

  PrevMove() {
    const turn = this.state.turn - 1;
    if (turn >= 0 && turn < this.game_specs_queue.length)
      this.setState({turn: turn});
  }

  CreateEdges(turn) {
    var edges = [];
    // eslint-disable-next-line
    turn.Bases.map((base, index) => {
      for (var i = 0; i < base.Connections.length; i++) {
        if (base.Connections[i] > index)
        edges.push({from: index, to: base.Connections[i]})
      }
    });
    return edges
  }

  CreateNodes(turn) {
    return turn.Bases.map((base, index) => {
      return {color: CSS_COLOR_NAMES[base.Occupying_player + 1], id: index, label: base.Troop_count.toString(), x: base.X, y:base.Y}
    });
  }

  render() {
    const current_specs     = this.game_specs_queue[this.state.turn];
    const current_turn_map  = this.game.Turns[this.state.turn];

    var player_leader_board = current_specs.player_leader_board.map((item, index) => {
      return (<tr key={index}><td>{ index + 1 }</td><td>{ this.game.Players[item].Name }</td><td><div style={{backgroundColor: CSS_COLOR_NAMES[item + 1], width: "25px", height: "25px"}} className="color-square"></div></td></tr>)
    });
    var team_leader_board = current_specs.team_leader_board.map((item, index) => {
      return (<tr key={index}><td>{ index + 1 }</td><td>Team { item }</td></tr>)
    });

    var graph = {
      nodes: this.CreateNodes(current_turn_map),
      edges: this.CreateEdges(current_turn_map),
    };

    var options = OPTION0;
    return (
      <div className="my-form">
        <h2>{this.props.map[0]}</h2>
        <div className="row">
          <div className="col-sm-4 container row align-items-center">
          <input className="form-control"
            defaultValue={ this.view_specs.delay_time }
            ref={(input) => this.view_specs.delay_time = input}
            type="range"
            min="0"
            max="5000"/>
          </div>
          <div className="col-sm-2 container"><button className="btn btn-dark btn-block" onClick={this.PauseToggle.bind(this)}>{this.state.pause_text}</button></div>
          <div className="col-sm-2 container"><button className="btn btn-dark btn-block" onClick={this.ResetMap.bind(this)}>Reset</button></div>
          <div className="col-sm-2 container"><button className="btn btn-dark btn-block" onClick={this.PrevMove.bind(this)}><i className="fa fa-chevron-left" aria-hidden="true"></i></button></div>
          <div className="col-sm-2 container"><button className="btn btn-dark btn-block" onClick={this.NextMove.bind(this)}><i className="fa fa-chevron-right" aria-hidden="true"></i></button></div>
          <div className="w-100"></div>
          <Graph graph={graph} options={options} />
          <div className="w-100"></div>
          <div className="board col-sm-12 col-md-6">
            <h4>Team Leader Board</h4>
            <table className="table">
              <tbody>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                </tr>
                {team_leader_board}
              </tbody>
            </table>
          </div>
          <div className="board col-sm-12 col-md-6">
            <h4>Player Leader Board</h4>
            <table className="table">
            <tbody>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Color</th>
                </tr>
                {player_leader_board}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
export default PlayGame;
