// ChatPage.js
import React, { useState, useRef, useEffect } from 'react';
import styles from './ChatPage.module.css';

const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { id: 1, text: 'Hello!', sender: 'receiver' },
    { id: 2, text: 'How are you?', sender: 'receiver' },
    { id: 3, text: 'I\'m doing well, thanks!', sender: 'sender' },
  ]);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = () => {
    if (message.trim() !== '') {
      setChatHistory([...chatHistory, { id: Date.now(), text: message, sender: 'sender' }]);
      setMessage('');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.chatHistory}>
        {chatHistory.map((msg) => (
          <div
            key={msg.id}
            className={`${styles.message} ${msg.sender === 'sender' ? styles.sender : styles.receiver}`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          className={styles.inputBox}
          placeholder="Type your message..."
          value={message}
          onChange={handleMessageChange}
        />
        <button className={styles.submitButton} onClick={handleSubmit}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
