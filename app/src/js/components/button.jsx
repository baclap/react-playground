'use strict';

const { React, Base } = require('./base');
const ColorPicker = require('react-color');
const sweetAlert = require('sweetalert');

class Button extends Base {

  constructor(props) {
    super(props);
    this.state = {
      color: '#58C060',
      background: '#fff'
    };

  }

  handleColorChange(color) {
    this.setState({color: '#' + color.hex});
  }

  submitColor(){
    sweetAlert( this.state.color );
    this.setState({
      background:this.state.color
    });
  }

  render() {
    var style = {
      backgroundColor: this.state.background
    };

    return (
      <div style={style}>
        <button onClick={this.submitColor}>Save Color</button>
        <ColorPicker color={ this.state.color } type="sketch" onChangeComplete={this.handleColorChange} />
      </div>
    );
  }
}

module.exports = Button;