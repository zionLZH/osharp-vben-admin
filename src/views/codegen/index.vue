<template>
  <div class="p-16px">
    <div class="bg-white p-16px">
      <AInput prefix="路由前缀：" placeholder="/api/admin" v-model:value="prefixRoute"/>
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

const prefixRoute = ref('/api/admin')

function doSubmit() {
  codegenByConfigJson(configJson, unref(prefixRoute))
}
</script>

<style scoped>

</style>
