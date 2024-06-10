import React, { useState, useEffect } from 'react';
import GamePage from './GamePage';
import TypingGame from './TypingGame';
import dataEng from './dataEng.json';
import dataCh from './dataCh.json';
import TypingEffect from './TypingEffect';
import './App.css';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameText, setGameText] = useState('');
  const [gameIndex, setGameIndex] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [language, setLanguage] = useState('english');
  const [length, setLength] = useState('long');
  const [totalScore, setTotalScore] = useState(0);
  const [usedTexts, setUsedTexts] = useState([]);
  const [lastScore, setLastScore] = useState(0);
  const [data, setData] = useState({ short: [], medium: [], long: [] });

  useEffect(() => {
    if (language === 'english') {
      setData(dataEng);
    } else {
      setData(dataCh);
    }
  }, [language]);

  const handleStartGame = () => {
    const newText = getRandomText();
    setGameStarted(true);
    setGameText(newText);
    setGameIndex(gameIndex + 1);
    setShowResults(false);
    setUsedTexts([...usedTexts, newText]);
  };

  const handleSubmit = (errors, time) => {
    setErrorCount(errors);
    setElapsedTime(time);

    const wordCount = gameText.length;
    const allowedTime = wordCount * 0.5;
    const errorRate = (errors / gameText.length) * 100;
    let score = 0;

    if (errorRate <= 60) {
      if (time <= allowedTime) {
        score = 5;
      } else if (time <= allowedTime + 5) {
        score = 3;
      } else if (time <= allowedTime + 10) {
        score = 1;
      } else if (time <= allowedTime + 15) {
        score = 0.5;
      }
    }

    score -= Math.ceil(errorRate / 5) * 0.5;
    setLastScore(score);
    setTotalScore(totalScore + score);
    setShowResults(true);
  };

  const handleNextLevel = () => {
    const newText = getRandomText();
    setGameText(newText);
    setGameStarted(true);
    setShowResults(false);
    setUsedTexts([...usedTexts, newText]);
  };

  const handleExitGame = () => {
    if (window.confirm('你確定要離開遊戲嗎？這會清除當前成績。')) {
      setGameStarted(false);
      setShowResults(false);
      setGameText('');
      setGameIndex(0);
      setErrorCount(0);
      setElapsedTime(0);
      setTotalScore(0);
      setUsedTexts([]);
      setLastScore(0);
    }
  };

  const getRandomText = () => {
    let selectedTexts = data[length];
    const remainingTexts = selectedTexts.filter(text => !usedTexts.includes(text));

    if (remainingTexts.length === 0) {
      setUsedTexts([]);
      return selectedTexts[Math.floor(Math.random() * selectedTexts.length)];
    } else {
      return remainingTexts[Math.floor(Math.random() * remainingTexts.length)];
    }
  };

  return (
    <div className="App">
      <audio autoPlay loop>
        <source src={'./public/IamDayLight.mp3'} type="audio/mpeg" />
        你的瀏覽器不支援播放此音樂。
      </audio>
      {!gameStarted && !showResults && <GamePage onStartGame={handleStartGame} setLanguage={setLanguage} setLength={setLength} />}
      {gameStarted && !showResults && <TypingGame text={gameText} onSubmit={handleSubmit} totalScore={totalScore} />}
      {showResults && (
        <TypingEffect
          errorCount={errorCount}
          elapsedTime={elapsedTime}
          errorRate={(errorCount / gameText.length * 100).toFixed(2)}
          lastScore={lastScore}
          onNextLevel={handleNextLevel}
          onExitGame={handleExitGame}
        />
      )}
    </div>
  );
}

export default App;
