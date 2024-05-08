<template>
  <PopOver placement="bottom-center">
    <template #reference>
      <div>
        <SvgIcon name="sun" class="w-3 h-3" />
      </div>
    </template>
    <div class="w-14">
      <Menu :menuList="THEME_DROPDOWN_LIST" @select="handleSelect" />
    </div>
  </PopOver>
</template>
<script setup>
import { THEME_DROPDOWN_LIST } from '@/constants'
const handleSelect = (val) => {
  console.log(val)
}
</script>
