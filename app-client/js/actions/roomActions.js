export function initiateSocket(socket) {
  return {
    type: 'SET_SOCKET',
    payload: socket,
  };
}
