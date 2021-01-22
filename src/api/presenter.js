import axios from "axios";
import { PUBLISH_URL, PUBLISH_TOKEN, STREAM_NAME } from "../constants";

async function authMillicast() {
  try {
    const { data } = await axios.post(
      PUBLISH_URL,
      JSON.stringify({ streamName: STREAM_NAME }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${PUBLISH_TOKEN}`,
        },
      }
    );
    return {
      url: data.urls[0],
      jwt: data.jwt,
    };
  } catch (error) {
    throw new Error("Server error");
  }
}

async function connectWebSocket(url, jwt, pc) {
  const ws = new WebSocket(url + "?token=" + jwt); //token
  ws.onopen = async function() {
    let desc = await pc.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
    });
    await pc.setLocalDescription(desc);
    let data = {
      name: STREAM_NAME,
      sdp: desc.sdp,
      codec: "h264",
    };
    //create payload
    let payload = {
      type: "cmd",
      transId: Math.random() * 10000,
      name: "publish",
      data: data,
    };
    ws.send(JSON.stringify(payload));
  };

  ws.addEventListener("message", async function(evt) {
    let msg = JSON.parse(evt.data);
    let data;
    let remotesdp;
    let answer;
    switch (msg.type) {
      case "response":
        data = msg.data;
        remotesdp = data.sdp;
        if (remotesdp && remotesdp.indexOf("\na=extmap-allow-mixed") !== -1) {
          remotesdp = remotesdp
            .split("\n")
            .filter(function(line) {
              return line.trim() !== "a=extmap-allow-mixed";
            })
            .join("\n");
        }
        answer = new RTCSessionDescription({
          type: "answer",
          sdp: remotesdp + "a=x-google-flag:conference\r\n",
        });
        await pc.setRemoteDescription(answer);
        break;
    }
  });
  return ws;
}

export { authMillicast, connectWebSocket };
