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

    if ((symbol === 'New') || (symbol === 'Start')) {
      return (
        <div onClick={ () => action(symbol) } className="action-button zoom-button">
          <h1 className="zoom-button">{ symbol }</h1>
        </div>
      );
    }

    return (
      <div onClick={ () => action(symbol) } className="character zoom-button">
        <h1>{ symbol }</h1>
      </div>
    );
  }
}

export default Character;
