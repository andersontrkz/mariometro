import React, { Component } from 'react';
import Countdown from 'react-countdown';
import Sound from 'react-sound';
import themeMp3 from '../effects/theme.mp3';
import jumpMp3 from '../effects/jump.mp3';
import coinMp3 from '../effects/coin.mp3';
import endMp3 from '../effects/end.mp3';

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
      timeShow: '',
      timeSetup: '0',
      miliseconds: 0,
      sounds: {
        theme: Sound.status.PLAYING,
        jump: Sound.status.PLAYING,
        coin: Sound.status.PLAYING,
        end: Sound.status.PLAYING,
      }
    }
  }

  setColorCss() {
    let randomColor = "#"+((1<<24)*Math.random()|0).toString(16); 

    document.documentElement.style.setProperty('main-color', randomColor);
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

  clear() {
    this.setState({ timeSetup: '0' });
  }

  delete() {
    if(this.checkSetupTime()) {
      this.setState((oldState) => {
        let updateValue = oldState.timeSetup.slice(0, -1);
        if (oldState.timeSetup.length < 2) {
          updateValue = '0';
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

    if(character === "C") {
      this.clear();
    }

    if(character === "X") {
      this.delete();
    }

    this.setState({ showCountdown: false, showStop: false, coin: Sound.status.PLAYING });
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
      return <div>
      <Sound
          url={ endMp3 }
          playbackRate={0.9}
          volume={30}
          playStatus={this.state.sounds.end}
        />
      <Finished />
    </div>;
    } else {
      return <span>{hours}:{minutes}:{seconds}</span>;
    }
  };

  componentDidMount() {
    this.setState({ theme: true })
  }

  render() {
    const { sounds: { theme, jump, coin }, showCountdown, showStop, miliseconds } = this.state;

    return (
      <section className="chronometer">
        <header>
        </header>
        <main className="keyboardParent">
          <div className="keyboard" />
          <div className="keyboard">
          { (showCountdown && showStop) && <Sound
            url={ coinMp3 }
            playbackRate={2}
            volume={20}
            playStatus={coin}
          /> }
          { showCountdown && <Sound
            url={ themeMp3 }
            playbackRate={1}
            volume={100}
            playStatus={theme}
            loop={true}
          />  }
          { !showCountdown && <Sound
            url={ jumpMp3 }
            playbackRate={2}
            volume={20}
            playStatus={jump}
          />  }
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
