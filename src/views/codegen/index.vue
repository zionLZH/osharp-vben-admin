<template>
  <div class="p-16px">
    <div class="bg-white p-16px">
      <div class="text-red-400 text-14px mb-8px"
        >请勿输入/api开头，/api请自行在项目中的环境变量配置</div
      >
      <AInput
        prefix="路由前缀："
        placeholder="/admin (请勿输入/api开头，/api请自行在项目中的环境变量配置)"
        v-model:value="prefixRoute"
      />
      <div class="flex justify-start mt-8px">
        <AButton type="primary" @click="doSubmit">生成并下载代码</AButton>
      </div>
    </div>
  </div>
</template>

<script setup>
  import configJson from './config.json'
  import { ref, unref } from 'vue'
  import { codegenByConfigJson } from './utils'

  const prefixRoute = ref('/admin')

  function doSubmit() {
    codegenByConfigJson(configJson, unref(prefixRoute))
  }
</script>

<style scoped></style>
