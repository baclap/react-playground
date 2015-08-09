'use strict';

const React = require('react');

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {greeting: 'Hello World!'};
  }
  handleClick(e) {
    e.preventDefault();
    alert(this.state.greeting);
  }
  render() {
    return (
      <button onClick={this.handleClick.bind(this)}>Greet</button>
    )
  }
}

module.exports = Button;
