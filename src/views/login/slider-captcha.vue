<template>
  <div id="captcha" class="text-base"></div>
</template>
<script setup>
import '@/vendor/sliderCaptcha/longbow.slidercaptcha.min.js'
import '@/vendor/sliderCaptcha/slidercaptcha.min.css'
import { getCaptcha } from '@/api/sys.js'
import { ref, onMounted } from 'vue'
import { message } from '@/components'

const captcha = ref(null)
onMounted(() => {
  captcha.value = sliderCaptcha({
    id: 'captcha',
    verify: function (a, b) {
      console.log('验证成功')
      console.log(a, b)
      return true
    },
    onFail: function () {
      console.log('验证失败')
    }
    // async onSuccess(arr) {
    //   console.log(arr)
    //   const res = await getCaptcha({
    //     behavior: arr
    //   })
    // },
  })
})
</script>
