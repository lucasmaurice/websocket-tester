export function openConnection(payload) {
  return async function (dispatch) {
    let id = null;

    const url = new URL(window.location.href);

    if (!payload.id) {
      console.log(`Fetch the ID from: ${url.origin}/id`);
      id = await fetch(`${url.origin}/id`).then((res) => res.json());
      dispatch({
        type: "FETCH_ID_SUCCESS",
        payload: id,
      });
    }

    const wsUrl = new URL(url.origin);
    wsUrl.protocol = wsUrl.protocol === "http:" ? "ws:" : "wss:";

    console.log(`Starting WebSocket connection to: ${wsUrl.origin}/ws?id=${id ? id.id : payload.id}`);
    const ws = new WebSocket(`${wsUrl.origin}/ws?id=${id ? id.id : payload.id}`);

    ws.onmessage = (e) => {
      const payload = JSON.parse(e.data);
      dispatch({
        type: "RELOAD_MESSAGES",
        payload: {
          messages: payload.data,
        },
      });
    };

    dispatch({
      type: "CREATE_WEBSOCKET_COMPLETE",
      payload: {
        ws,
      },
    });
  };
}
