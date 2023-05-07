import { Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const InputArea = ({ socket, messages, setMessages }) => {
    const [name, setName] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showError, setShowError] = useState(false);

    const isValidInp = (text) => {
        console.log("!text.trim()", !text.trim());
        if (!text.trim()) {
            setErrorMessage("Text consisting only of spaces is not allowed");
            setShowError(true);
            return false;
        }

        const regex = /https?:\/\/\S+/i;
        if (regex.test(text)) {
            setErrorMessage("Links not allowed");
            setShowError(true);
            return false;
        }
        return true;
    };

    const isValidName = (name) => {
        if (!name.trim()) {
            setErrorMessage("Name consisting only of spaces is not allowed");
            setShowError(true);
            return false;
        }

        // Check if the field contains invalid characters
        const regex = /^[a-zA-Z0-9_ ]+$/;
        console.log("name", name);
        console.log("regex.test(name)", regex.test(name));
        console.log("name", name);
        if (!regex.test(name)) {
            setErrorMessage(
                "Name can consist only of Latin characters, digits and underscores"
            );
            setShowError(true);
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isValidInp(newMessage) || !isValidName(name)) {
            return;
        }
        await axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/api/messages`, {
                name: name,
                text: newMessage,
            })
            .then((response) => {
                setMessages([...messages, response.data]);
                setNewMessage("");
                socket.emit("newMessage", response.data);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    };

    const handleKeySubmit = (event) => {
        if (event.ctrlKey && event.key === "Enter") {
            event.preventDefault();
            handleSubmit(event);
        }
    };

    return (
        <div className="input-area">
            <input
                type="text"
                placeholder="Type your name"
                onChange={(event) => setName(event.target.value)}
                onClick={() => setShowError(false)}
            ></input>
            <textarea
                type="text"
                placeholder="Type your message"
                value={newMessage}
                onChange={(event) => setNewMessage(event.target.value)}
                onKeyDown={handleKeySubmit}
                onClick={() => setShowError(false)}
            ></textarea>
            <Button onClick={handleSubmit} variant="contained">
                Send
            </Button>
            {showError && <div className="error-message">{errorMessage}</div>}
        </div>
    );
};
export default InputArea;
