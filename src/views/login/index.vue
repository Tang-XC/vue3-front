<template>
  <div class="w-full h-full bg-zinc-100 xl:bg-zinc-300 grid place-items-center">
    <div
      class="w-full h-auto xl:w-[400px] xl:h-auto xl:bg-zinc-100 p-2 xl:shadow-lg xl:rounded text-[0px]"
    >
      <div class="w-full text-center text-lg mb-3">
        <h1>登录</h1>
      </div>
      <Form :model="form" :rules="formRules" labelWidth="70px">
        <FormItem label="用户名" prop="username">
          <Input
            type="text"
            v-model="form.username"
            placeholder="请输入用户名"
          />
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input
            type="password"
            v-model="form.password"
            placeholder="请输入密码"
          />
        </FormItem>
      </Form>
      <div class="mb-2 text-right">
        <a class="text-sm text-zinc-500">没有账号？去注册！</a>
      </div>
      <Button ref="btn" style="width: 100%" @click="open = true">登陆</Button>
      <div class="hr"></div>
      <div class="flex justify-center items-center">
        <SvgIcon name="qq" class="w-5 h-5 mx-1" />
        <SvgIcon name="wechat" class="w-5 h-5 mx-1" />
        <SvgIcon name="ding" class="w-5 h-5 mx-1" />
      </div>
    </div>
  </div>
  <AnimModal
    width="350px"
    title="请完成安全验证"
    v-model="open"
    :triggerRef="btn"
  >
    <div class="mt-1 mb-3">
      <SliderCaptcha />
    </div>
  </AnimModal>
</template>
<script setup>
import { ref } from 'vue'
import SliderCaptcha from './slider-captcha.vue'
const form = ref({
  username: '',
  password: ''
})
const open = ref(false)
const btn = ref(null)
const formRules = {
  username: [
    {
      trigger: 'blur',
      validator: (value = '') => {
        // 校验用户名不能为空
        if (value === '') {
          return '用户名不能为空!'
        }
        // 校验用户名是否合法(用户名只能包含字母、数字、下划线、减号)
        const reg = /^[a-zA-Z0-9_-]+$/
        if (!reg.test(value)) {
          return '用户名只能包含字母、数字、下划线、减号!'
        }
        return true
      }
    }
  ],
  password: [
    {
      trigger: 'blur',
      validator: (value = '') => {
        // 校验密码不能为空
        if (value === '') {
          return '密码不能为空!'
        }
        //密码长度不少于6位
        if (value.length < 6) {
          return '密码长度不少于6位!'
        }
        //密码必须包含大写字母、小写字母、数字
        const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/
        if (!reg.test(value)) {
          return '密码必须包含大写字母、小写字母、数字!'
        }
        return true
      }
    }
  ]
}
</script>
<style scoped lang="scss">
.hr {
  width: 100%;
  border-bottom: 1px solid #ccc;
  margin: 32px 0;
  position: relative;
  &::after {
    content: '或';
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 16px;
    color: #999;
    padding: 0 12px 0 12px;
    background-color: rgb(244 244 245 / var(--tw-bg-opacity));
  }
}
</style>
