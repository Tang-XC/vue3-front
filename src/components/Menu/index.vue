<template>
  <div>
    <ul>
      <li
        v-for="item in menuList"
        :key="item.value"
        class="flex items-center px-1 py-1 hover:bg-gray-100 cursor-pointer dark:hover:bg-zinc-800"
        @click="onSelect(item)"
      >
        <SvgIcon
          v-if="item.icon"
          :name="item.icon"
          class="w-2 h-2 mr-1"
          fillClass="dark:fill-zinc-300"
        />
        <div class="text-base dark:text-zinc-300">{{ item.name }}</div>
      </li>
    </ul>
  </div>
</template>
<script setup>
const props = defineProps({
  menuList: {
    type: Array,
    required: true
  }
})
const emit = defineEmits(['select'])
const onSelect = (item) => {
  emit('select', item.value)
}
</script>
