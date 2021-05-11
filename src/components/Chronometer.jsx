import React, { Component } from 'react';
import Countdown from 'react-countdown';

import Character from './Character';
import Finished from './Finished';

class Chronometer extends Component {
  constructor(props) {
    super(props);
    
    this.changeTime = this.changeTime.bind(this);
    this.handleCharacterClick = this.handleCharacterClick.bind(this);
    this.clockTurnSwitch = this.clockTurnSwitch.bind(this);
    this.checkSetupTime = this.checkSetupTime.bind(this);
    this.rendererCountdown = this.rendererCountdown.bind(this);
    
    this.state = {
      showCountdown: false,
      showStop: false,
      running: false,
      fixedTime: 0,
      timeShow: '',
      timeSetup: '0',
      miliseconds: 0,
    }
  }

  checkSetupTime() {
    const spliedTimeSetup = this.state.timeSetup.split('');
    console.log(spliedTimeSetup)
    if (spliedTimeSetup.length > 5) {
      alert('The maximum time allowed in minutes is only 6 digits!')
      return false;
    }
    return true;
  }

  changeTime(number) {
    if(this.checkSetupTime()) {
      this.setState((oldState) => {
        let updateValue = oldState.timeSetup + number;
        if (oldState.timeSetup === '0') {
          updateValue = number;
        }
        return { timeSetup: updateValue }
      });
    }
  }

  convertToMiliseconds() {
    const { timeSetup } = this.state;
    const miliseconds = parseInt(timeSetup) * 1000;

    this.setState({ miliseconds });
  }

  handleCharacterClick(character) {
    const numbers = ['0', '1', '2', '3' , '4', '5', '6', '7', '8' ,'9'];

    numbers.forEach((number) => {
      if(character === number) {
        this.changeTime(character);
      }
    })

    this.setState({ showCountdown: false, showStop: false });
  }

  generateKeyboard() {
    return (
      <main className="keyboard">
        <p className="time-setup-title">In Minutes</p>
        <Character action={ () => alert('The time must be chosen in minutes!') } symbol={ this.state.timeSetup } type="timeSetup" />
        <Character action={ this.handleCharacterClick } symbol="7" />
        <Character action={ this.handleCharacterClick } symbol="8" />
        <Character action={ this.handleCharacterClick } symbol="9" />
        <Character action={ this.handleCharacterClick } symbol="4" />
        <Character action={ this.handleCharacterClick } symbol="5" />
        <Character action={ this.handleCharacterClick } symbol="6" />
        <Character action={ this.handleCharacterClick } symbol="1" />
        <Character action={ this.handleCharacterClick } symbol="2" />
        <Character action={ this.handleCharacterClick } symbol="3" />
        <Character action={ this.handleCharacterClick } symbol="X" />
        <Character action={ this.handleCharacterClick } symbol="0" />
        <Character action={ this.handleCharacterClick } symbol="C" />
        <Character action={ this.clockTurnSwitch } symbol={ this.state.showStop ? 'New' : 'Start' } />
      </main>
    )
  }
  
  clockTurnSwitch() {
    this.convertToMiliseconds();
    this.setState((oldState) => ({ showCountdown: !oldState.showCountdown, showStop: !oldState.showStop, timeSetup: '0' }));
  }

  rendererCountdown({ hours, minutes, seconds, completed }) {
    if (completed) {
      return <Finished />;
    } else {
      return <span>{hours}:{minutes}:{seconds}</span>;
    }
  };

  render() {
    const { showCountdown, miliseconds } = this.state;

    return (
      <section className="chronometer">
        <header></header>
        <main className="keyboardParent">
          <div className="keyboard" />
          <div className="keyboard">
          { showCountdown &&  <Countdown date={Date.now() + miliseconds} renderer={ this.rendererCountdown } /> }
          </div>
          { this.generateKeyboard() }
        </main>
        <footer>
          <div>.</div>
        </footer>
      </section>
    );
  }
}

export default Chronometer;
