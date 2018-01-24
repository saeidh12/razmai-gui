import React, { Component } from 'react';
import Dropzone from 'react-dropzone'

class MapFromFile extends Component {
  OnFileLoad(e) {
    this.props.Map(JSON.parse(this.reader.result));
  }
  ReadFile(file) {
    this.reader = new FileReader();
    this.reader.onload = this.OnFileLoad.bind(this);

    this.reader.readAsText(file);
  }
  render() {
    return (
      <div className="my-form">
        <h2>Map From File</h2>
        <div className="file-input">
          <Dropzone
            accept=".json"
            multiple={false}
            onDrop={(accepted, rejected) => { this.ReadFile(accepted[0]) }}
          >
            <p>Drop map file here or click to open file dialog.</p>
          </Dropzone>
        </div>
      </div>
    );
  }
}
export default MapFromFile;
