export function openModal(modal) {
  return {
    type: 'OPEN_MODAL',
    payload: modal,
  };
}

export function closeModal() {
  return {
    type: 'CLOSE_MODAL',
    payload: null,
  };
}
