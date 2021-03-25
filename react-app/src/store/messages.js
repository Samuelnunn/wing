const SEND_A_MESSAGE = "messages/sendAMessage";
const FETCH_ALL_MESSAGES = "messages/fetchAllMessages";
const FETCH_MESSAGE_FEED = "messages/fetchMessageFeed";


const sendMessage = (payload) => ({
    type: SEND_A_MESSAGE,
    payload,
});

const fetchAllMessages= (message) => ({
    type: FETCH_ALL_MESSAGES,
    message,
});

const fetchMessageFeed=(messagefeed) => ({
    type: FETCH_MESSAGE_FEED,
    messagefeed,
});




export const fetchMessages = () => {
    return async (dispatch) => {
        const response = await fetch(`/api/messages/`);
        const responseJSON = await response.json();
        responseJSON.messages.sort((message) => {
            return Date.parse(message.createdAt);
      })
        dispatch(fetchAllMessages(responseJSON.messages));
    };
};

export const fetchMessageFeedMessages = (userId) => {
    return async (dispatch) => {
        const response = await fetch(`/api/messages/messagefeed/${userId}`);
        const responseJSON = await response.json();
        responseJSON.messages.sort((message) => {
            return Date.parse(message.createdAt);
      })
        dispatch(fetchMessageFeed(responseJSON.messages));
        const res = await fetch(`/api/messages/messagefeed/${userId}`, {
            method: 'PUT'
        })
        return responseJSON.messages;
    };
};


export const sendAMessage = (id, content) => async (dispatch) => {
    const formData = new FormData();
        formData.append("content", content);
        let res = await fetch(`/api/messages/${id}`, {
            method: "POST",
            body: formData,
        });
        const message = await res.json();
        return message;
};

function messagesReducer(state = {message: [], messagefeed: []}, {type, message, messagefeed}) {
    switch (type) {
        case SEND_A_MESSAGE:
            return {...state, message};
        case FETCH_ALL_MESSAGES: 
            return {...state, message};
        case FETCH_MESSAGE_FEED: 
            return {...state, messagefeed};
        default:
            return state;
    }
};

export default messagesReducer;