<template>
  <div>
    <WaterFall
      class="px-1 w-full"
      :data="pexelsList"
      nodeKey="id"
      :column="column"
      :picturePreReading="false"
    >
      <template v-slot="{ item, width }">
        <PicCard :data="item" :width="width" />
      </template>
    </WaterFall>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { getPexelsList } from '@/api/pexels'
import PicCard from '../components/PicCard/index.vue'
const { column } = defineProps({
  column: {
    type: Number,
    default: 5
  }
})
const pexelsList = ref([])
const params = {
  page: 1,
  size: 20
}
const getData = () => {
  getPexelsList(params).then((res) => {
    pexelsList.value = res.data.list
  })
}
onMounted(() => {
  getData()
})
</script>
