<template>
  <div>
    <div class="flex items-center text-zinc-400 text-sm">
      <span>最近搜索</span>
      <SvgIcon
        name="delete-fill"
        class="w-1.5 h-1.5 ml-1"
        fillClass="fill-zinc-400"
        @click="handleClear"
      />
    </div>
    <div class="flex mt-1.5 flex-wrap">
      <div
        class="flex items-center bg-zinc-200 mr-2 rounded-sm py-0.5 px-1 cursor-pointer"
        v-for="item in store.getters.history"
        @click="handleClick(item)"
      >
        <div>
          {{ item }}
        </div>
        <SvgIcon
          name="close-fill"
          class="w-1.5 h-1.5 ml-1"
          @click.stop="handleRemove(item)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { EMIT_CLICK } from '@/constants'
const store = useStore()
const emit = defineEmits([EMIT_CLICK])
const handleClick = (item) => {
  emit(EMIT_CLICK, item)
}
const handleRemove = (item) => {
  store.commit('search/removeHistory', item)
}
const handleClear = () => {
  store.commit('search/clearHistory')
}
</script>
