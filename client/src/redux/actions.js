export function openConnection(payload) {
  return async function (dispatch) {
    const url = new URL(window.location.href);
    url.protocol = url.protocol === "http:" ? "ws:" : "wss:";

    console.log(`Starting WebSocket connection to: ${url.origin}/ws`);
    const ws = new WebSocket(`${url.origin}/ws`);

    ws.onmessage = (e) => {
      const payload = JSON.parse(e.data);
      console.log("Received message:", payload);

      switch (payload.type) {
        case "init":
          dispatch({ type: "INIT_CHAT", payload: payload });
          break;
        case "message":
          dispatch({ type: "NEW_MESSAGE", payload: { messages: payload } });
          break;
        default:
          console.error("Unknown message type:", payload.type);
      }
    };

    dispatch({ type: "CREATE_WEBSOCKET_COMPLETE", payload: { ws } });
  };
}
