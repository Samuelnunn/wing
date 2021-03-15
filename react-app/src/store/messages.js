const SEND_A_MESSAGE = "messages/sendAMessage";
const FETCH_ALL_MESSAGES = "messages/fetchAllMessages";



const sendMessage = (payload) => ({
    type: SEND_A_MESSAGE,
    payload,
});

const fetchAllMessages= (message) => ({
    type: FETCH_ALL_MESSAGES,
    message,
});

const fetchOneUsersMessages=(message) => ({
    type: FETCH_ALL_MESSAGES,
    message,
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

export const fetchAllOneUsersMessage = (userId) => {
    return async (dispatch) => {
        const response = await fetch(`/api/messages/${userId}`);
        const responseJSON = await response.json();
        responseJSON.messages.sort((message) => {
            return Date.parse(message.createdAt);
      })
        dispatch(fetchOneUsersMessages(responseJSON.messages));
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
        dispatch(sendMessage(message));
        return message;
    };

function messagesReducer(state = {message: []}, {type, message}) {
    switch (type) {
        case SEND_A_MESSAGE:
            return {...state, message};
        case FETCH_ALL_MESSAGES:
            
            return {...state, message};
        default:
            return state;
    }
};

export default messagesReducer;