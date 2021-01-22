import axios from "axios";
import { connectWebSocket, authMillicast } from "./presenter";

async function getICEServers() {
  const turnUrl = "https://turn.millicast.com/webrtc/_turn";
  const { data } = await axios.put(turnUrl);
  const listICEs = data.v.iceServers.map((cred) => {
    const v = cred.url;
    if (v) {
      cred.urls = v;
      delete cred.url;
    }
    return cred;
  });
  return listICEs;
}

export { getICEServers, connectWebSocket, authMillicast };
