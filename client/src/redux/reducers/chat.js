const initialState = {
  id: null,
  ws: null,
  messages: [],
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "CREATE_WEBSOCKET_COMPLETE":
      return { ...state, ws: payload.ws };
    case "INIT_CHAT":
      return { ...state, messages: payload.messages, id: payload.clientId };
    case "NEW_MESSAGE":
      state.messages.push({ message: payload.message, sender: payload.sender, timestamp: payload.timestamp });
      return { ...state };
    default:
      return state;
  }
}
