<template>
  <div class="w-full bg-white border-b border-b-zinc-200 px-2 py-1">
    <div class="flex justify-items-center items-center">
      <HeaderLogo />
      <HeaderSearch class="flex-1" v-model="searchValue">
        <template #dropdown>
          <h1>Hello world</h1>
        </template>
      </HeaderSearch>
      <HeaderAvatar />
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import HeaderLogo from './components/logo/index.vue'
import HeaderSearch from './components/search/index.vue'
import HeaderAvatar from './components/avatar/index.vue'
const searchValue = ref('')
</script>
