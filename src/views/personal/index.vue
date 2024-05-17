<template>
  <div>
    <NavBar title="我的" @onLeftClick="goBack" />
    <div class="border m-2 p-3">
      <h1 class="text-[32px] text-center">This is psersonal page</h1>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const router = useRouter()
const store = useStore()
const goBack = () => {
  store.commit('app/changeRouterType', 'back')
  router.back()
}
</script>
