<script setup>
import { ref } from "vue";

let status = ref("");

window.runtime.EventsOn("installation-status", (status) => {
  status.value = status;
});
</script>
<template>
  <el-input
      v-model="status"
      :rows="1"
      type="textarea"
      readonly
      resize="none"
      disabled
  />
</template>