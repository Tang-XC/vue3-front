<template>
  <PopOver placement="bottom-center">
    <template #reference>
      <div>
        <SvgIcon
          :name="SvgIconName"
          class="w-3 h-3"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        />
      </div>
    </template>
    <div class="w-14">
      <Menu :menuList="THEME_DROPDOWN_LIST" @select="handleSelect" />
    </div>
  </PopOver>
</template>
<script setup>
import { THEME_DROPDOWN_LIST } from '@/constants'
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const handleSelect = (val) => {
  const type = THEME_DROPDOWN_LIST.find((item) => item.value === val)?.type
  store.commit('theme/changeThemeType', type)
}
const SvgIconName = computed(() => {
  switch (store.getters.themeType) {
    case 'light':
      return 'sun'
    case 'dark':
      return 'moon'
    case 'system':
      return 'colorPalette'
  }
  return
})
</script>
