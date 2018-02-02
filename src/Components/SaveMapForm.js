import React, { Component } from 'react';
var fileDownload = require('react-file-download');

class SaveMapForm extends Component {
  MapisValid(Map) {
    if (Map.Bases.length < 2) {
      alert('Must have at least 2 bases!');
      return false
    }
    if (Map.Number_of_players < 2) {
      alert('Must have at least 2 players!');
      return false
    }
    return true
  }

  SaveMap(e) {
    if (this.MapisValid(this.props.Map)) {
      this.props.Map.Weak_delimiter    = parseInt(this.newWeak_delimiter.value, 10);
    	this.props.Map.Medium_delimiter  = parseInt(this.newMedium_delimiter.value, 10);
    	this.props.Map.Conquer_bonus     = parseInt(this.newConquer_bonus.value, 10);

      fileDownload(JSON.stringify(this.props.Map, null, '\t'), this.newMapName.value + '.json');
    }
    e.preventDefault();
  }

  render() {
    return (
      <div className="my-form col">
        <h2>Map Specs</h2>
        <div className="w-100"></div>
        <form className="row" onSubmit={ this.SaveMap.bind(this) }>
          <div className="input-group mb-3 col-sm-12">
            <div className="input-group-prepend">
              <label className="input-group-text">Number of Players</label>
            </div>
            <p>{this.props.Map.Number_of_players}</p>
          </div>
          <div className="w-100"></div>
          <div className="input-group mb-3 col-sm-12 col-lg-6">
            <div className="input-group-prepend">
              <label className="input-group-text">Map Name</label>
            </div>
            <input className="form-control"
              defaultValue={ "new_map" }
              type="text"
              ref={(input) => this.newMapName = input}
              required/>
          </div>
          <div className="input-group mb-3 col-sm-12 col-lg-6">
            <div className="input-group-prepend">
              <label className="input-group-text">Weak Delimiter</label>
            </div>
            <input className="form-control"
              defaultValue={ this.props.Map.Weak_delimiter }
              type="number"
              min="0"
              ref={(input) => this.newWeak_delimiter = input}/>
          </div>
          <div className="input-group mb-3 col-sm-12 col-lg-6">
            <div className="input-group-prepend">
              <label className="input-group-text">Medium Delimiter</label>
            </div>
            <input className="form-control"
              defaultValue={ this.props.Map.Medium_delimiter }
              type="number"
              min="0"
              ref={(input) => this.newMedium_delimiter = input}/>
          </div>
          <div className="input-group mb-3 col-sm-12 col-lg-6">
            <div className="input-group-prepend">
              <label className="input-group-text">Conquer Bonus</label>
            </div>
            <input className="form-control"
              defaultValue={ this.props.Map.Conquer_bonus }
              type="number"
              min="0"
              ref={(input) => this.newConquer_bonus = input}/>
          </div>
          <div className="w-100"></div>
          <input className="btn btn-sm btn-block btn-info col-sm-12" type="submit" value="SAVE"/>
        </form>
      </div>
    );
  }
}
export default SaveMapForm;
