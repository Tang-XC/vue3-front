<template>
  <div>
    <InfiniteList v-model="loading" :isFinished="isFinished" @onLoad="getData">
      <WaterFall
        class="px-1 w-full"
        :data="pexelsList"
        nodeKey="id"
        :column="column"
        :picturePreReading="false"
      >
        <template v-slot="{ item, width }">
          <PicCard
            :data="item"
            :width="width"
            @click="handlePicCardClick(item.id)"
          />
        </template>
      </WaterFall>
    </InfiniteList>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import { getPexelsList } from '@/api/pexels'
import PicCard from '../components/PicCard/index.vue'
import { useStore } from 'vuex'
const store = useStore()
const { column } = defineProps({
  column: {
    type: Number,
    default: 5
  }
})
const pexelsList = ref([])
const loading = ref(false)
const isFinished = ref(false)
const params = ref({
  page: 1,
  size: 20,
  categoryId: store.getters.currentCategory,
  searchText: store.getters.currentSearch
})
const getData = () => {
  if (isFinished.value) return
  if (pexelsList.value.length) {
    params.value.page += 1
  }
  getPexelsList(params.value).then((res) => {
    pexelsList.value = [...pexelsList.value, ...res.data.list]
    if (pexelsList.value.length === res.data.total) {
      isFinished.value = true
    }
    loading.value = false
  })
}
const resetParams = (val) => {
  params.value.page = val.page
  params.value.categoryId = val.categoryId
  pexelsList.value = []
  isFinished.value = false
}
watch(
  () => store.getters.currentCategory,
  (val) => {
    resetParams({
      page: 1,
      categoryId: val
    })
  }
)
watch(
  () => store.getters.currentSearch,
  (val) => {
    resetParams({
      page: 1,
      searchText: val
    })
  }
)
</script>
