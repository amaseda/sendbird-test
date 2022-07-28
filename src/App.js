import { useState } from "react";
import { sendbird } from "./interfaces/Sendbird";

function App() {
    const [createChannelForm, setCreateChannelForm] = useState({
        name: "Recruiter Chat",
        channelUrl: "recruiter-chat-000",
    });
    const [currentId, setCurrentId] = useState("123456");
    const [targetUserId, setTargetUserId] = useState("234567");

    function init() {
        console.log("sendbird on init", sendbird);
        sendbird.initUser();
    }

    function onCreateChannelFormChange(e) {
        const { name, value } = e;
        const { target } = value;
        setCreateChannelForm((prev) => ({ ...prev, [name]: target }));
    }

    function onCreateChannelFormSubmit(e) {
        e.preventDefault();
        sendbird.createChannel(createChannelForm);
    }

    function onCurrentIdChange(e) {
        const { value } = e.target;
        setCurrentId(value);
    }

    function onTargetUserIdChange(e) {
        const { value } = e.target;
        setTargetUserId(value);
    }

    function retrieveChannelList() {
        sendbird.retrieveChannelList();
    }

    function sendMessage() {
        sendbird.sendMessage();
    }

    return (
        <div>
            <label>
                Current ID:{" "}
                <input
                    onChange={onCurrentIdChange}
                    type="text"
                    value={currentId}
                />
            </label>
            <br />
            <br />
            <label>
                Target User ID:{" "}
                <input
                    onChange={onTargetUserIdChange}
                    type="text"
                    value={targetUserId}
                />
            </label>
            <br />
            <br />
            <form onSubmit={onCreateChannelFormSubmit}>
                <b>Create Channel</b>
                <br />
                <label htmlFor="name">
                    Name
                    <input
                        name="name"
                        onChange={onCreateChannelFormChange}
                        type="text"
                        value={createChannelForm.name}
                    />
                </label>
                <br />
                <label htmlFor="channelUrl">
                    Channel URL
                    <input
                        name="channelUrl"
                        onChange={onCreateChannelFormChange}
                        type="text"
                        value={createChannelForm.channelUrl}
                    />
                </label>
                <br />
                <button type="submit">Create Channel</button>
            </form>
            <br />
            <br />
            <button onClick={init}>Init</button>
            <button onClick={sendMessage}>Send Message</button>
            <button onClick={retrieveChannelList}>Retrieve Channel List</button>
        </div>
    );
}

export default App;
