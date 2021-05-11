import YoutubeBackground from 'react-youtube-background'

import './App.css';
import Chronometer from './components/Chronometer'

function App() {
  return (
    <YoutubeBackground className="fixed-background" videoId="d4Fr_usyMbw">
      <Chronometer />
    </YoutubeBackground>
  );
}

export default App;
