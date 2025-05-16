export function openConnection(payload) {
  return async function (dispatch) {
    let id = null;

    const url = new URL(url.origin);
    url.protocol = url.protocol === "http:" ? "ws:" : "wss:";

    console.log(`Starting WebSocket connection to: ${url.origin}/ws?id=${id ? id.id : payload.id}`);
    const ws = new WebSocket(`${url.origin}/ws?id=${id ? id.id : payload.id}`);

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
