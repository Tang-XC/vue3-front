<template>
  <div>
    <WaterFall
      :data="pexelsList"
      nodeKey="id"
      :column="5"
      :picturePreReading="true"
    >
      <template v-slot="{ item, width }">
        <PicCard :data="item" />
      </template>
    </WaterFall>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { getPexelsList } from '@/api/pexels'
import PicCard from '../components/PicCard/index.vue'
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
