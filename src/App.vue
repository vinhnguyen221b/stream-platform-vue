<template>
  <div id="app">
    <Header />
    <Stream />
    <Controls />
  </div>
</template>

<script>
import { getICEServers, connectWebSocket, authMillicast } from "./api";
import Header from "./components/Header.vue";
import Stream from "./components/Stream.vue";
import Controls from "./components/Controls.vue";

export default {
  name: "App",
  components: {
    Header,
    Stream,
    Controls,
  },
  data() {
    return {
      constraints: {
        audio: true,
        video: { facingMode: "" },
      },
      url: "",
      jwt: "",
      configuration: {
        iceServers: [],
        bundlePolicy: "max-bundle",
      },
      pc: "",
      presenterVideo: null,
      streamBtn: null,
      stopBtn: null,
      switchBtn: null,
      localStream: null,
      isStreaming: false,
    };
  },
  async created() {
    await this.startStream();
  },
  methods: {
    async startStream() {
      try {
        const str = await navigator.mediaDevices.getUserMedia(this.constraints);
        if (this.presenterVideo !== null) {
          this.presenterVideo.srcObject = str;
        }
        await this.initializeData();
        str.getTracks().forEach((track) => {
          this.pc.addTrack(track, str);
        });
      } catch (error) {
        alert("Error when getting media:", error);
      }
    },
    async getMediaStream() {},
    async initializeData() {
      await this.getICEServers();
      this.createPeerConnection();
      await this.authMillicast();
    },
    async getICEServers() {
      this.configuration.iceServers = await getICEServers();
    },
    async authMillicast() {
      const { url, jwt } = await authMillicast();
      this.url = url;
      this.jwt = jwt;
    },
    createPeerConnection() {
      this.pc = new RTCPeerConnection(this.configuration);
    },
    async publishStream() {
      if (!this.isStreaming) {
        if (this.pc) {
          await this.authMillicast();
          this.ws = await connectWebSocket(this.url, this.jwt, this.pc);
          this.isStreaming = true;
        }
      }
    },
  },
  mounted() {
    this.presenterVideo = document.getElementsByTagName("video")[0];
  },
};
</script>

<style>
html {
  overflow: hidden;
}
body {
  background: linear-gradient(to right, #134e5e, #71b280);
  margin: 0px;
  padding: 0px;
}

body,
html,
button,
input,
select,
textarea {
  font-family: Helvetica, Verdana, Arial, sans-serif;
}
#app {
  height: 100vh;
  padding-top: 1rem;
  background-image: url(./assets/bg.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
}
</style>
