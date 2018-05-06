export function addMessageToChat(chatLine) {
  return {
    type: 'ADD_MESSAGE',
    payload: chatLine,
  };
}
