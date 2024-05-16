<template>
  <div
    class="main-w[180px] bg-white dark:bg-zinc-800 rounded-full shadow-lg flex items-center justify-center px-2 py-1"
  >
    <div
      v-for="item in items"
      class="w-5 flex flex-col items-center justify-center col mx-0.5 text-sm mt-0.5 text-zinc-400 font-bold"
      :class="{
        'text-zinc-900': item.path === route.path
      }"
      @click="handleClick(item)"
    >
      <SvgIcon
        :name="item.icon"
        class="w-2.5 h-2.5 fill-zinc-400"
        :class="{
          'fill-zinc-900': item.path === route.path
        }"
      />
      <span>{{ item.title }}</span>
    </div>
  </div>
</template>
<script setup>
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const store = useStore()
defineProps({
  items: {
    type: Array,
    default: () => []
  }
})
const handleClick = (item) => {
  store.commit('app/changeRouterType', 'push')
  router.push(item.path)
}
</script>
