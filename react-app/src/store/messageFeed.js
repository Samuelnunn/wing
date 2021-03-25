// const FETCH_MESSAGE_FEED = "messages/fetchMessageFeed";



// const fetchMessageFeed=(messagefeed) => ({
//     type: FETCH_MESSAGE_FEED,
//     messagefeed,
// });



// export const fetchMessageFeedMessages = (userId) => {
//     return async (dispatch) => {
//         const response = await fetch(`/api/messages/messagefeed/${userId}`);
//         const responseJSON = await response.json();
//         responseJSON.messages.sort((message) => {
//             return Date.parse(message.createdAt);
//       })
//         dispatch(fetchMessageFeed(responseJSON.messages));
//     };
// };




// function messagesFeedReducer(state = {message: [], messagefeed: []}, {type, message, messagefeed}) {
//     switch (type) {
//         case FETCH_FEED: 
//             return {...state, messagefeed};
//         default:
//             return state;
//     }
// };

// export default messagesFeedReducer;