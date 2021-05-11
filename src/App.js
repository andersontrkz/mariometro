import YoutubeBackground from 'react-youtube-background'
import Countdown from 'react-countdown';

import './App.css';
import Chronometer from './components/Chronometer'

const Completionist = () => <span>You are good to go!</span>;

const rendererCountdown = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    return <Completionist />;
  } else {
    return <span>{hours}:{minutes}:{seconds}</span>;
  }
};

function App() {
  return (
    <YoutubeBackground className="fixed-background" videoId="d4Fr_usyMbw">
      <Countdown date={Date.now() + 5000} renderer={ rendererCountdown } />
      <Chronometer />
    </YoutubeBackground>
  );
}

export default App;
