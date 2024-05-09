<template>
  <div
    class="bg-whtie dark:bg-zinc-900 xl:dark:bg-zinc-800 rounded pb-1 w-[230px]"
  >
    <div class="relative w-full rounded cursor-zoom-in group">
      <img :src="data.photo" class="w-full rounded bg-transparent" />
      <div
        class="opacity-0 w-full h-full bg-zinc-900/50 absolute top-0 left-0 duration-300 group-hover:opacity-100 xl:flex flex-col justify-between p-1"
      >
        <div class="flex justify-between">
          <div>
            <Button
              icon="fullscreen"
              class="bg-zinc-100 dark:bg-zinc-400"
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
          <Button>
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
</template>
<script setup>
defineProps({
  data: {
    type: Object,
    requried: true
  }
})
</script>
