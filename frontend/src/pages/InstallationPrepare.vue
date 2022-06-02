<script setup>
import SelectLanguage from "../components/SelectLanguage.vue";
import { Download } from "@element-plus/icons-vue";
</script>

<template>
  <div class="locale-changer">
    <select-language />
  </div>
  <div class="text-title">
    <p> Hi &#x1F44B; </p>
    <p> {{ $t('prepare.title') }} </p>
  </div>
  <div class="btn-start">
    <el-button type="primary" :icon="Download" size="large" round>
      {{ $t('prepare.start') }}
    </el-button>
  </div>
</template>

<style scoped>
.locale-changer {
  display: flex;
  justify-content: flex-end;
}

.text-title {
  font-size: 50px;
  font-weight: bold;
}

.text-title p:first-child {
  font-style: italic;
}

.text-title p:last-child {
  margin: 20px 0;
  font-size: 20px;
  color: #3A3A3A;
}

.btn-start {
  margin-top: 100px;
}
</style>