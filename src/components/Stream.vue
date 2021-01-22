<template>
  <div id="vidView">
    <video autoplay muted playsinline></video>
  </div>
</template>

<script>
export default { name: "Stream" };
</script>

<style scoped lang="scss">
#vidView {
  background: transparent;
  height: 75%;
  video {
    object-fit: cover;
    height: 100%;
    max-height: 100%;
    display: flex;
    left: 0;
    right: 0;
    margin: auto;
    border-radius: 5px;
    @media (max-width: 768px) {
      height: 60%;
    }
  }
  @media (max-width: 768px) {
    height: unset;
    max-width: 100%;
  }
}
</style>
