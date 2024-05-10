<template>
  <div class="m-1">
    <ul>
      <li v-for="item in lineCount" class="w-full h-2 my-1 overflow-hidden">
        <div
          v-if="item === 1"
          class="skeleton-item h-full w-[40%] rounded-sm"
        ></div>
        <div
          v-else-if="item === lineCount"
          class="skeleton-item h-full w-[60%] rounded-sm"
        ></div>
        <div v-else class="skeleton-item w-full h-full" rounded-sm></div>
      </li>
    </ul>
  </div>
</template>
<script setup>
const lineCount = 4
</script>
<style lang="scss" scoped>
.skeleton-item {
  position: relative;
  overflow: hidden;
  background-color: rgb(229, 231, 235);
  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: -100%;
    width: 130%;
    height: 100%;
    background: radial-gradient(circle, rgb(255, 255, 255), rgb(229, 231, 235));
    animation: skeleton 1.5s ease-in-out infinite;
  }
}
@keyframes skeleton {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}
</style>
