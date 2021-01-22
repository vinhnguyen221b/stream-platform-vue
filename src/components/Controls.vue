<template>
  <div>
    <div class="controls">
      <button id="publishBtn" class="stream-btn">
        <i class="fas fa-video"></i>
      </button>
      <button id="stopBtn" class="stream-btn">
        <i class="fas fa-stop"></i>
      </button>
      <button id="switchBtn" class="stream-btn" title="For switch camera">
        <i class="fas fa-exchange-alt"></i>
      </button>
    </div>
    <div>
      <button id="loadBtn">
        <i class="fa fa-refresh fa-spin"></i>
      </button>
    </div>
    <div style="margin-top: 5px">
      <a
        target="_blank"
        href="https://meetz.biz/"
        class="back-btn"
        style="border-color: goldenrod"
        >MEETZ <i class="fas fa-arrow-circle-right"></i
      ></a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Controls",
};
</script>

<style scoped lang="scss">
.stream-btn {
  display: inline-block;
  color: #fff;
  font-weight: bold;
  background-color: #38ef7d;
  border: none;
  border-radius: 50%;
  padding: 15px;
  margin: 10px;
  font-size: 15px;
  height: 50px;
  width: 50px;
  cursor: pointer;
}

#stopBtn {
  background-color: red;
}

#switchBtn {
  background-color: teal;
}

button:disabled,
button[disabled] {
  border: 1px solid #999999;
  background-color: #cccccc !important;
  color: #666666;
}

.back-btn {
  display: inline-block;
  color: goldenrod;
  border: 2px solid #ef3838;
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
  text-decoration: none;
}

#loadBtn {
  color: white;
  font-size: 24px;
  border: none;
  background: transparent;
  left: 0;
  right: 0;
  margin: auto;
}

.controls {
  margin: auto;
  font-size: 15px;
}
</style>
