// const SHOW = 'messageModal/SHOW';

// const HIDE = 'messageModal/HIDE';

// const MESSAGES = 'messageModal/Messages';

// const setPosts = messages => ({ type: MESSAGES, messages });

// export const ShowEventModal = () => ({ type: SHOW });

// export const HideEventModal = () => ({ type: HIDE });

// export const getMessages = userId => async dispatch => {
//   const { data } = await dispatch(`/api/messages/${eventId}/posts`);
//   dispatch(setPosts(data.posts));
// };

// export const CreateComment = (eventId, body) => async () => {
//   const { data } = await csrfetch(`/api/events/${eventId}/posts`, {
//     method: 'POST',
//     body: JSON.stringify({ body })
//   });
//   return data;
// };

// export const DeleteComment = (eventId, postId) => async () => {
//   const { data } = await csrfetch(`/api/events/${eventId}/posts/${postId}`, {
//     method: 'DELETE'
//   });
//   return data;
// };

// export const EditComment = (eventId, postId, body) => async () => {
//   const { data } = await csrfetch(`/api/events/${eventId}/posts/${postId}`, {
//     method: 'PATCH',
//     body: JSON.stringify({ body })
//   });
//   return data;
// };

// export default function reducer (
//   state = { display: false, event: null, posts: [] },
//   { type, event, posts }) {
//   switch (type) {
//     case EVENT:
//       return { ...state, event };
//     case POSTS:
//       return { ...state, posts };
//     case SHOW:
//       return { ...state, display: true };
//     case HIDE:
//       return { ...state, display: false, event: null, posts: [] };
//     default:
//       return state;
//   }
// }