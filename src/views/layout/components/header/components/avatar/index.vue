<template>
  <PopOver placement="bottom-right">
    <template #reference>
      <div>
        <SvgIcon name="user-fill" class="w-3 h-3" />
      </div>
    </template>
    <div class="w-14">
      <Menu :menuList="USER_DROPDOWN_LIST" @select="handleSelect" />
    </div>
  </PopOver>
</template>
<script setup>
import { USER_DROPDOWN_LIST } from '@/constants'
const handleSelect = (val) => {
  console.log(val)
}
</script>
