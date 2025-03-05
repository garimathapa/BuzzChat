const Message = ({ text, sender, timestamp, read }: { text: string; sender: string; timestamp: string; read: boolean }) => {
    return (
      <div className={`message ${sender === "user" ? "message--user" : "message--bot"}`}>
        <p className="message__text">{text}</p>
        <span className="message__timestamp">{timestamp}</span>
        {sender === "user" && <span className="message__read">{read ? "✔✔" : "✔"}</span>}
      </div>
    );
  };
  
  export default Message;
  