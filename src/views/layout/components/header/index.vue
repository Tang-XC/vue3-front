<template>
  <div
    class="w-full bg-white dark:bg-zinc-800 border-b dark:border-b-zinc-700 border-b-zinc-200 px-2 py-1"
  >
    <div class="flex justify-items-center items-center">
      <Logo />
      <Search class="flex-1" v-model="searchValue" @search="goSearch">
        <template #dropdown>
          <Hint
            :searchText="searchValue"
            v-show="searchValue"
            @click="handleClick"
          />
          <History @click="handleClick" />
        </template>
      </Search>
      <Theme />
      <Avatar />
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import Logo from './components/logo/index.vue'
import Search from './components/search/index.vue'
import Theme from './components/theme/index.vue'
import Avatar from './components/avatar/index.vue'
import Hint from './components/search/hint.vue'
import History from './components/search/history.vue'
const searchValue = ref('')
const store = useStore()
const handleClick = (val) => {
  console.log(val)
  searchValue.value = ''
  store.commit('search/addHistory', val)
  store.commit('search/setCurrentSearch', val)
}
const goSearch = () => {
  if (searchValue.value) {
    store.commit('search/addHistory', searchValue.value)
    store.commit('search/setCurrentSearch', searchValue.value)
    searchValue.value = ''
  }
}
</script>
