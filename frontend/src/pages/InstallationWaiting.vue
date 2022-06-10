<script setup>
import { reactive, ref } from 'vue';

let status = ref("");

const progress = reactive({
  count: 0,
  percentage: [30, 60, 80, 100],
  colors: [
    { color: '#f56c6c', percentage: 30 },
    { color: '#e6a23c', percentage: 60 },
    { color: '#1989fa', percentage: 90 },
    { color: '#5cb87a', percentage: 100 }
  ]
});

const callBack = () => {
  location.hash = "";
};

</script>

<template>
  <el-progress type="circle" :percentage="progress.percentage" :color="progress.colors" />
  <el-input
      v-model="status"
      :rows="1"
      type="textarea"
      readonly
      resize="none"
  />
  <el-button type="primary" @click="callBack">Start</el-button>
</template>