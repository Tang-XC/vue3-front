<template>
  <div>
    <div class="flex justify-between items-center my-1 px-1.5">
      <div class="flex-1"></div>
      <div class="flex-1">
        <h2 class="text-lg font-bold text-center dark:text-zinc-200">
          全部分类
        </h2>
      </div>
      <div class="flex-1">
        <SvgIcon
          name="close"
          class="w-1.5 h-1.5 float-right cursor-pointer dark:fill-zinc-300"
          @click="handleClose"
        />
      </div>
    </div>
    <ul class="flex flex-wrap justify-start">
      <li
        class="dark:text-zinc-300 text-sm flex-auto px-1 py-1 rounded-sm bg-gray-200 dark:bg-zinc-700 my-1 mx-1.5 text-gray-600 text-center"
        v-for="item in data"
        :key="item.id"
        @click="handleSelect(item.id)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>
<script setup>
defineProps({
  data: {
    type: Array,
    required: true
  }
})
const emit = defineEmits(['close', 'onSelect'])
const handleSelect = (item) => {
  emit('onSelect', item)
  emit('close')
}
const handleClose = () => {
  emit('close')
}
</script>
