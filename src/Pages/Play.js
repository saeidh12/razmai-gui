import React, { Component } from 'react';
import axios from 'axios';
import ServerSelect from '../Components/ServerSelect';
import PickMap from '../Components/PickMap';
import PickAIs from '../Components/PickAIs';
import PlayGame from '../Components/PlayGame';

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maps:      null,
      ais:       null,
      mapPicked: null,
      players:   null,
      teams:     null,
      timeLimit: 0.01,
    };
    this.gameServer = null;
  }

  getMapandAIs() {
    try {
      axios.get(this.gameServer + '/maps')
        .then( (response) => {
          this.setState({maps: response.data})
        })
        .catch( (error) => {
          console.log(error);
          alert(error);
        });
      axios.get(this.gameServer + '/ais')
        .then( (response) => {
          this.setState({ais: response.data})
        })
        .catch( (error) => {
          console.log(error);
          alert(error);
        });
    }
    catch(err) {
      this.gameServer = null;
    }
  }
  render() {
    let content;
    if (!this.gameServer)
      content = <ServerSelect GameServer={(server) => {
        this.gameServer = server;
        this.getMapandAIs();
      }}/>
    else if (this.state.maps != null && this.state.mapPicked == null)
      content = <PickMap maps={this.state.maps} pickedmap={(mapgraph) => this.setState({mapPicked: mapgraph})}/>
    else if (this.state.ais != null && this.state.players == null && this.state.teams == null && this.state.mapPicked != null)
      content = <PickAIs playersANDteams={(players, teams) => this.setState({players: players, teams: teams})} ais={this.state.ais} numberofPlayers={this.state.mapPicked[1]["Number_of_players"]}/>
    else if (this.state.players != null && this.state.teams != null && this.state.mapPicked != null)
      content = <PlayGame server={this.gameServer} map={this.state.mapPicked} players={this.state.players} teams={this.state.teams} timeLimit={this.state.timeLimit}/>
    return (
      <div>
        { content }
      </div>
    );
  }
}
export default Play;
