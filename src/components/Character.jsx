import React, { Component } from 'react';

class Character extends Component {
  render() {
    const { symbol, action, type } = this.props;
    if (type === 'timeSetup') {
      return (
        <div onClick={ () => action(symbol) } className="time-setup">
          <h1>{ symbol }</h1>
        </div>
      );
    }

    if ((symbol === 'Start') || (symbol === 'Stop')) {
      return (
        <div onClick={ () => action(symbol) } className="action-button">
          <h1>{ symbol }</h1>
        </div>
      );
    }

    return (
      <div onClick={ () => action(symbol) } className="character">
        <h1>{ symbol }</h1>
      </div>
    );
  }
}

export default Character;
