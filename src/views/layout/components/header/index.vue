<template>
  <div
    class="w-full bg-white dark:bg-zinc-800 border-b dark:border-b-zinc-700 border-b-zinc-200 px-2 py-1"
  >
    <div class="flex justify-items-center items-center">
      <Logo />
      <Search class="flex-1" v-model="searchValue">
        <template #dropdown>
          <h1>Hello world</h1>
        </template>
      </Search>
      <Theme />
      <Avatar />
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import Logo from './components/logo/index.vue'
import Search from './components/search/index.vue'
import Theme from './components/theme/index.vue'
import Avatar from './components/avatar/index.vue'
const searchValue = ref('')
</script>
