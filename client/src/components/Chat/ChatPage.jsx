import React, { useState, useRef, useEffect } from "react";
import styles from "./ChatPage.module.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import axios from "axios";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // Function to handle sending messages
  const handleSend = async (text) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { content: text, fromMe: true },
    ]);
    // Update UI to show typing indicator
    setIsTyping(true);

    try {
      // Send message to backend API
      const response = await axios.post("http://localhost:8080/api/prompt", {
        userMessage: text,
      });
      console.log(response);
      // Update messages state with response from the server
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: response.data.content, fromMe: false },
      ]);
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    } finally {
      // Update UI to hide typing indicator
      setIsTyping(false);
    }
  };

  return (
    <div className='App'>
      <div style={{ position: "relative" }} className={styles.chat_area}>
        <MainContainer>
          <ChatContainer className={styles.message_area}>
            <MessageList
              scrollBehavior='smooth'
              typingIndicator={
                isTyping ? (
                  <TypingIndicator content='ChatGPT is typing' />
                ) : null
              }
            >
              {messages.map((message, i) => (
                <Message
                  key={i}
                  model={{
                    message: message.content,
                    sender: message.fromMe ? "user" : "bot",
                    direction: message.fromMe ? "outgoing" : "incoming",
                    position: "single",
                  }}
                />
              ))}
            </MessageList>
            <MessageInput placeholder='Type message here' onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
};

export default ChatPage;
