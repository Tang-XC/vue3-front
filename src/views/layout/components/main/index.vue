<template>
  <div class="bg-white dark:bg-zinc-900 sticky top-0 left-0 w-full z-10">
    <Navigator
      type="pc"
      :data="store.getters.categories"
      v-model="activeCategory"
    >
    </Navigator>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { ALL_CATEGORY_ITEM } from '@/constants'

const activeCategory = ref(ALL_CATEGORY_ITEM.id)

const store = useStore()
</script>
