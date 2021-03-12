const SEND_A_MESSAGE = "messages/sendAMessage";
const FETCH_ALL_MESSAGES = "messages/fetchAllMessages";


const sendMessage = (payload) => ({
    type: SEND_A_MESSAGE,
    payload,
});

const fetchAllMessages= (messages) => ({
    type: FETCH_ALL_MESSAGES,
    payload: messages,
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

const initialState = [];

function messagesReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case SEND_A_MESSAGE:
            newState = [...state, action.payload];
            return newState;
        case FETCH_ALL_MESSAGES:
            newState = [...state, ...action.payload];
            return newState;
        default:
            return state;
    }
};

export default messagesReducer;