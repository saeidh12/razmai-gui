import React, { Component } from 'react';
import axios from 'axios';

class ServerSelect extends Component {
  testandSaveGameServer(e) {
    var serverString = this.gameserver.value.replace(/\/+$/, "");
    axios.get(serverString + '/test-connection')
      .then( (response) => {
        if (response.data === true) {
          // this.props.history.push({
          //   pathname: '/menu',
          //   state: {
          //     gameServer: serverString
          //   }
          // })
          this.props.GameServer(serverString);
        } else {
          alert('Wrong Server');
        }
      })
      .catch( (error) => {
        console.log(error);
        alert(error);
      });
    e.preventDefault();
  }

  render() {
    return (
      <div className="my-form">
        <h2> Enter Game Server Address</h2>
        <form onSubmit={this.testandSaveGameServer.bind(this)}>
          <input className="form-control"
            type="text"
            defaultValue={ "http://localhost:8012/" }
            ref={(input) => this.gameserver = input}
            required/>
          <input className="btn btn-sm btn-block btn-info" type="submit" value="GO!"/>
        </form>
      </div>
    );
  }
}
export default ServerSelect;
