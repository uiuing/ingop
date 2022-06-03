<script setup>
import { ref } from 'vue';

let status = ref("");

</script>

<template>
  <el-input
      v-model="status"
      :rows="10"
      type="textarea"
      readonly
      resize="none"
  />
</template>