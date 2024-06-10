import React from 'react';
import './GamePage.css';

const GamePage = ({ onStartGame, setLanguage, setLength }) => {
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleLengthChange = (e) => {
    setLength(e.target.value);
  };

  return (
    <div className="game-container">
      <h1 className="game-title">打字測驗遊戲</h1>
      <div className="options-container">
        <div className="option">
          <label>語言選擇：</label>
          <select className="select" onChange={handleLanguageChange}>
            <option value="english">英打</option>
            <option value="chinese">中打</option>
          </select>
        </div>
        <div className="option">
          <label>篇幅選擇：</label>
          <select className="select" onChange={handleLengthChange}>
            <option value="short">短篇幅</option>
            <option value="medium">中篇幅</option>
            <option value="long">長篇幅</option>
          </select>
        </div>
      </div>
      <button className="start-button" onClick={onStartGame}>開始遊戲</button>
    </div>
  );
}

export default GamePage;
