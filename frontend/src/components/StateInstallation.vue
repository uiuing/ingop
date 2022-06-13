<script setup>
import { ref } from "vue";
import * as runtime from "../../wailsjs/runtime";
import { redToGreen } from "../utils/colors/gradient";

const taskNumber = ref(5);

const statusKey = ref("");
const percentage = ref(0);

function updatePercentage() {
  for (let i = 0; i < 100 / taskNumber.value; ++i) {
    setTimeout(() => {
      percentage.value++;
    }, i * 30);
  }
}

runtime.EventsOn("installation-status", (key) => {
  updatePercentage();
  statusKey.value = key;
});

</script>
<template>
  <el-progress class="progress" :percentage="percentage" :color="redToGreen" />
  <el-input
      class="text-status"
      :modelValue="$t('installStatus.'+statusKey)"
      :rows="1"
      type="textarea"
      resize="none"
      readonly
      disabled
  />
</template>

<style scoped>
.progress{
  margin:50px 0 0 0;
}
.text-status{
  margin:10px 0;
}
</style>