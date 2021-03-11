const SEND_A_MESSAGE = "messages/SEND_A_MESSAGE";


const sendMessage = (payload) => ({
  type: SEND_A_MESSAGE,
  payload,
});

export const sendAMessage = (id, content) => async (dispatch) => {
    const formData = new FormData();
    formData.append("content", content);
    console.log(formData)
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
      default:
        return state;
    }
};

export default messagesReducer;