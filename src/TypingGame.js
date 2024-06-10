// TypingGame.js
import React, { useState, useEffect } from 'react';
import './TypingGame.css';

const TypingGame = ({ text, onSubmit, totalScore }) => {
  const [inputText, setInputText] = useState('');
  const [startTime, setStartTime] = useState(Date.now());
  const [errors, setErrors] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
        handleSubmit();
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((Date.now() - startTime) / 1000);
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  useEffect(() => {
    
    const handleCopy = (e) => {
      e.preventDefault();
      alert('禁止複製貼上');
    };
    const handlePaste = (e) => {
      e.preventDefault();
      alert('禁止複製貼上');
    };

    document.addEventListener('copy', handleCopy);
    document.addEventListener('paste', handlePaste);

    return () => {
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('paste', handlePaste);
    };
  }, [inputText, errors]);

  const handleChange = (e) => {
    const typedText = e.target.value;
    setInputText(typedText);

    let errorCount = 0;
    for (let i = 0; i < typedText.length; i++) {
      if (typedText[i] !== text[i]) {
        errorCount++;
      }
    }

    setErrors(errorCount);
  };

  const handleSubmit = () => {
    const endTime = Date.now();
    const elapsedTime = (endTime - startTime) / 1000;

    const totalErrors = text.length - inputText.length + errors;
    const errorRate = ((totalErrors) / text.length) * 100;

    onSubmit(totalErrors, elapsedTime);
  };

  return (
    <div className="typing-game-container">
      <div className="info-container">
        <p className="timer">計時器：{Math.floor((Date.now() - startTime) / 1000)}秒</p>
        <p className="score">總得分：{totalScore}分</p>
      </div>
      <div className="text-input-container">
        <p className="text">{text}</p>
        <textarea 
          className="textarea" 
          type="text" 
          value={inputText} 
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          onCopy={(e) => e.preventDefault()} 
          onPaste={(e) => e.preventDefault()}  
          rows={5}
          cols={40}
          wrap="soft"
        />
        <button className="submit-button" onClick={handleSubmit}>提交</button>
      </div>
    </div>
  );
};

export default TypingGame;
