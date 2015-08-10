'use strict';

const { React, Base } = require('./base');

class Button extends Base {
  constructor(props) {
    super(props);
    this.state = {greeting: 'hello world'};
  }
  handleClick(e) {
    e.preventDefault();
    alert(this.state.greeting);
  }
  render() {
    return (
      <button onClick={this.handleClick}>Greet</button>
    )
  }
}

module.exports = Button;
