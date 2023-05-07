import { formatDate } from "../../helpers/date_converter"

const Chat = ({ messages }) => {
  return (
    <ul id="chat">
      {messages
        .slice()
        .reverse()
        .map((message) => (
          <li key={message._id}>
            <div className="name">
              <h2>Written by</h2>
              <h2><b>{message.name}</b></h2>
              <h3>at <b>{formatDate(message.createdAt)}</b></h3>
            </div>
            <div className="message">{message.text}</div>
          </li>
        ))}
    </ul>
  );
};
export default Chat;