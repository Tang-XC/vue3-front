<template>
  <div
    ref="triggerRef"
    class="bg-whtie dark:bg-zinc-900 xl:dark:bg-zinc-800 rounded pb-1"
    @click="isModalOpen = true"
  >
    <div class="relative w-full rounded cursor-zoom-in group">
      <transition name="fade">
        <div
          v-if="isLoading"
          class="w-full picCardImgCover bg-zinc-200 dark:bg-zinc-800 after:bg-gradient-to-r after:from-transparent after:via-zinc-50 after:to-transparent dark:after:bg-gradient-to-r dark:after:from-transparent dark:after:via-zinc-700 dark:after:to-transparent"
          :style="{
            height: (width / data.photoWidth) * data.photoHeight + 'px'
          }"
        ></div>
      </transition>
      <img
        ref="picCardImgRef"
        :src="data.photo"
        class="w-full rounded bg-zinc-100 dark:bg-zinc-700"
        :style="{
          height: (width / data.photoWidth) * data.photoHeight + 'px'
        }"
        alt=""
      />
      <div
        class="opacity-0 w-full h-full bg-zinc-900/50 absolute top-0 left-0 duration-300 group-hover:opacity-100 hidden xl:flex flex-col justify-between p-1"
      >
        <div class="flex justify-between">
          <div>
            <Button
              icon="fullscreen"
              class="bg-zinc-100 dark:bg-zinc-400"
              @click="handleFullScreen"
            ></Button>
          </div>
          <div class="flex">
            <Button
              icon="share"
              class="bg-zinc-100 dark:bg-zinc-400 mr-1"
            ></Button>
            <Button icon="heart" class="bg-zinc-100 dark:bg-zinc-400"></Button>
          </div>
        </div>
        <div class="flex justify-end">
          <Button @click="handleDownload(data.photo)">
            <SvgIcon name="download" class="w-3 h-3 fill-zinc-50" />
            下载
          </Button>
        </div>
      </div>
    </div>
    <div class="p-1">
      <div class="text-base dark:text-zinc-300">{{ data.title }}</div>
      <div class="flex text-sm justify-start items-center mt-0.5">
        <div class="rounded-full w-3 h-3 overflow-auto">
          <img :src="data.avatar" />
        </div>
        <div class="ml-1 text-zinc-500">
          {{ data.author }}
        </div>
      </div>
    </div>
  </div>
  <AnimModal v-model="isModalOpen" :triggerRef="triggerRef">
    <Detail :data="data" />
  </AnimModal>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { saveAs } from 'file-saver'
import { useFullscreen } from '@vueuse/core'
import AnimModal from '../AnimModal/index.vue'
import Detail from '../Detail/index.vue'

const picCardImgRef = ref(null)
const isLoading = ref(false)
const triggerRef = ref(null)
const isModalOpen = ref(false)
const { enter } = useFullscreen(picCardImgRef)

defineProps({
  data: {
    type: Object,
    requried: true
  },
  width: {
    type: Number
  }
})
const handleDownload = (url) => {
  saveAs(url)
}
const handleFullScreen = () => {
  enter()
}
const lazyLoad = (el) => {
  const temp = el.src
  el.src = ''
  isLoading.value = true
  const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
    if (isIntersecting) {
      setTimeout(() => {
        el.src = temp
        isLoading.value = false
      }, 1000)
      stop()
    }
  })
}
onMounted(() => {
  lazyLoad(picCardImgRef.value)
})
</script>
<style lang="scss" scoped>
.picCardImgCover {
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -300%;
    width: 200%;
    height: 100%;
    z-index: 9;
    /* background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 50%,
      rgba(255, 255, 255, 0) 100%
    ); */
    transform: skew(-20deg);
    animation: skeleton 1.3s ease-in-out infinite;
  }
}
@keyframes skeleton {
  0% {
    left: -300%;
  }
  100% {
    left: 130%;
  }
}

.fade-enter-active {
  transition: opacity 0s;
}
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
