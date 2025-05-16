export function openConnection(payload) {
  return async function (dispatch) {
    const url = new URL(window.location.href);
    url.protocol = url.protocol === "http:" ? "ws:" : "wss:";

    console.log(`Starting WebSocket connection to: ${url.origin}/ws`);
    const ws = new WebSocket(`${url.origin}/ws`);

    ws.onmessage = (e) => {
      const payload = JSON.parse(e.data);
      if (payload.data.type === "message") {
        dispatch({
          type: "NEW_MESSAGE",
          payload: {
            messages: payload.data,
          },
        });
      } else if (payload.data.type === "init") {
        dispatch({
          type: "INIT_CHAT",
          payload: payload.data,
        });
      }
    };

    dispatch({
      type: "CREATE_WEBSOCKET_COMPLETE",
      payload: {
        ws,
      },
    });
  };
}
