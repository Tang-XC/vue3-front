<template>
  <div>
    <NavBar title="上传" @onLeftClick="goBack" />
    <div class="border m-2 p-3">
      <h1 class="text-[32px] text-center">This is upload page</h1>
      <Button @click="toUser">to user</Button>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const router = useRouter()
const store = useStore()

const goBack = () => {
  store.commit('app/changeRouterType', 'back')
  router.back()
}
const toUser = () => {
  router.push('/personal')
}
</script>
