// src/TypingEffect.js
import React, { useState } from 'react';
import Typical from 'react-typical';
import './TypingEffect.css';

const TypingEffect = ({ errorCount, elapsedTime, errorRate, lastScore, onNextLevel, onExitGame }) => {
  const [userInput, setUserInput] = useState('');
  const messages = [
    `錯誤字數：${errorCount}`,
    `花費時間：${elapsedTime} 秒`,
    `錯誤率：${errorRate}%`,
    `本次得分：${lastScore} 分`,
    '是否進入下一關？請輸入「是」或「否」'
  ];

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleUserInputSubmit = () => {
    if (userInput.trim() === '是') {
      onNextLevel();
    } else if (userInput.trim() === '否') {
      onExitGame();
    } else {
      alert('請輸入有效的選項：「是」或「否」');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleUserInputSubmit();
    }
  };

  return (
    <div className="typing-effect-container">
    <p className="sender">BOT</p>
      <div className="message-bubble">
        
        {messages.map((msg, index) => (
          <p key={index}>
            <Typical steps={[msg, 3000]} wrapper="span" />
          </p>
        ))}
      </div>
      <div className="user-input-container">
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="請輸入「是」或「否」"
        />
        <button onClick={handleUserInputSubmit}>提交</button>
      </div>
    </div>
  );
};

export default TypingEffect;
