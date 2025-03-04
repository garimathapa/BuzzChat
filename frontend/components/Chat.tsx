import { useEffect, useState, useRef } from "react";
import Message from "./Message";
import TypingIndicator from "./TypingIndicator";
import FileUploadModal from "./FileUploadModal";

const Chat = () => {
  const [messages, setMessages] = useState<{ text: string; sender: string; timestamp: string; read: boolean }[]>([]);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:5000");

    ws.current.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      if (receivedMessage.type === "typing") {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 2000);
      } else {
        setMessages((prev) => [...prev, { ...receivedMessage, read: true }]);
        setIsTyping(false);
      }
    };

    return () => ws.current?.close();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = { text: message, sender: "user", timestamp: new Date().toLocaleTimeString(), read: false };
      ws.current?.send(JSON.stringify(newMessage));
      setMessages((prev) => [...prev, newMessage]);
      setMessage("");
    }
  };

  const handleTyping = () => {
    ws.current?.send(JSON.stringify({ type: "typing" }));
  };

  return (
    <div className="chat">
      <div className="chat__history">
        {messages.map((msg, index) => (
          <Message key={index} {...msg} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="chat__input-box">
        <input
          type="text"
          className="chat__input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleTyping}
        />
        <button className="chat__button" onClick={sendMessage}>Send</button>
        <button className="chat__button--upload" onClick={() => setShowModal(true)}>📎</button>
      </div>

      {showModal && <FileUploadModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Chat;
