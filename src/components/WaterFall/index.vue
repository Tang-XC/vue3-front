<template>
  <div
    class="relative"
    ref="waterFallRef"
    :style="{ height: containerHeight + 'px' }"
  >
    <template v-if="columnWidth && data.length">
      <div
        v-for="(item, index) in data"
        :key="nodeKey ? item[nodeKey] : index"
        class="waterfall-item absolute duration-300"
        :style="{
          width: columnWidth + 'px',
          left: item._style?.left + 'px',
          top: item._style?.top + 'px'
        }"
      >
        <slot :item="item" :width="columnWidth" :index="index" />
      </div>
    </template>
    <div v-else></div>
  </div>
</template>
<script setup>
import { onMounted, ref, computed, watch, nextTick, onUnmounted } from 'vue'
const props = defineProps({
  data: {
    type: Array,
    require: true
  },
  column: {
    default: 2,
    type: Number
  },
  columnSpacing: {
    default: 20,
    type: Number
  },
  rowSpacing: {
    type: Number,
    default: 20
  },
  picturePreReading: {
    type: Boolean,
    default: false
  }
})
const waterFallRef = ref(null)
const containerWidth = ref(0)
const containerHeight = ref(0)
const containerLeft = ref(0)
const columnWidth = ref(0)
const columnHeightObj = ref({})
const itemHeights = ref([])
const columnSpacingTotal = computed(() => {
  return (props.column - 1) * props.columnSpacing
})

// ==================计算列宽==================
const useContainerWidth = () => {
  const { paddingLeft, paddingRight } = getComputedStyle(
    waterFallRef.value,
    null
  )
  containerWidth.value =
    waterFallRef.value.offsetWidth -
    parseFloat(paddingLeft) -
    parseFloat(paddingRight)
  containerLeft.value = parseFloat(paddingLeft)
}
const useColumnHeightObj = () => {
  columnHeightObj.value = {}
  for (let i = 0; i < props.column; i++) {
    columnHeightObj.value[i] = 0
  }
}
const useColumnWidth = () => {
  useContainerWidth()
  columnWidth.value =
    (containerWidth.value - columnSpacingTotal.value) / props.column
}

// ==================需要图片预加载==================

const waitImgComplate = () => {
  itemHeights.value = []
  let itemElements = [...document.getElementsByClassName('waterfall-item')]
  const imgElements = getImgElements(itemElements)
  const allImgs = getAllImg(imgElements)
  onComplateImgs(allImgs).then((res) => {
    itemElements.forEach((el) => {
      itemHeights.value.push(el.offsetHeight)
    })
    useItemLocation()
  })
}

// ==================不需要图片预加载==================
const useItemHeight = () => {
  itemHeights.value = []
  let itemElements = [...document.getElementsByClassName('waterfall-item')]
  itemElements.forEach((el) => {
    itemHeights.value.push(el.offsetHeight)
  })
  useItemLocation()
}

//渲染位置
const useItemLocation = () => {
  props.data.forEach((item, index) => {
    if (item._style) return
    item._style = {}
    item._style.left = getItemLeft()
    item._style.top = getItemTop()
    increasingHeight(index)
  })
  containerHeight.value = getMaxHeight(columnHeightObj.value)
}

/**
 * 从itemElement中抽离出所有的imgElements
 */
const getImgElements = (itemElements) => {
  const imgElements = []
  itemElements.forEach((el) => {
    imgElements.push(...el.getElementsByTagName('img'))
  })
  return imgElements
}

/**
 * 生成所有图片链接数组
 */
const getAllImg = (imgElements) => {
  return imgElements.map((imgElement) => {
    return imgElement.src
  })
}

/**
 * 监听图片数组加载完成
 */
const onComplateImgs = (imgs) => {
  const promiseAll = []
  imgs.forEach((img, index) => {
    promiseAll[index] = new Promise((resolve, reject) => {
      const imageObj = new Image()
      imageObj.src = img
      imageObj.onload = () => {
        resolve({
          img,
          index
        })
      }
    })
  })
  return Promise.all(promiseAll)
}
/**
 * 返回列高对象中最小的高度
 */
const getMinHeight = (columnHeightObj) => {
  const columnHeightArr = Object.values(columnHeightObj)
  return Math.min(...columnHeightArr)
}

/**
 * 返回列高对象中最大的高度
 */
const getMaxHeight = (columnHeightObj) => {
  const columnHeightArr = Object.values(columnHeightObj)
  return Math.max(...columnHeightArr)
}

/**
 * 返回列高对象中最小高度所在的列
 */
const getMinHeightColumn = (columnHeightObj) => {
  const minHeight = getMinHeight(columnHeightObj)
  return Object.keys(columnHeightObj).find((key) => {
    return columnHeightObj[key] === minHeight
  })
}

/**
 * 返回下一个item的left
 */
const getItemLeft = () => {
  const column = getMinHeightColumn(columnHeightObj.value)
  return (
    column * (columnWidth.value + props.columnSpacing) + containerLeft.value
  )
}
/**
 * 返回下一个item的top
 */
const getItemTop = () => {
  return getMinHeight(columnHeightObj.value)
}

/**
 * 指定列高度自增
 */
const increasingHeight = (index) => {
  const minHeightCloumn = getMinHeightColumn(columnHeightObj.value)
  columnHeightObj.value[minHeightCloumn] +=
    itemHeights.value[index] + props.rowSpacing
  console.log(columnHeightObj.value)
}
watch(
  () => props.data,
  (newVal) => {
    nextTick(() => {
      // 第一次获取数据时，构建高度记录容器
      const resetColumnHeight = newVal.every((item) => !item._style)
      if (resetColumnHeight) {
        useColumnHeightObj()
      }

      // 图片预加载
      if (props.picturePreReading) {
        waitImgComplate()
      } else {
        useItemHeight()
      }
    })
  },
  {
    deep: true,
    immediate: true
  }
)
onMounted(() => {
  useColumnWidth()
})
onUnmounted(() => {
  props.data.forEach((item) => {
    delete item._style
  })
})
</script>
