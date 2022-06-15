<script setup>
import { ref } from "vue";
import * as runtime from "../../wailsjs/runtime";
import { redToGreen } from "../utils/colors/gradient";

const taskNumber = ref(5);

const statusKey = ref("init");
const percentage = ref(0);
const goPlusVersion = ref("");

const showCommand = ref(false);
const showOutput = ref(false);

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

runtime.EventsOn("goplus-version", (message) => {
  goPlusVersion.value = "\n" + message;
  setTimeout(() => {
    showCommand.value = true;
  }, 300);
  setTimeout(() => {
    showOutput.value = true;
  }, 800);
});

</script>
<template>
  <el-progress class="progress" :percentage="percentage" :color="redToGreen" />
  <div class="status-output">
    <span class="annotation"> # {{ $t('installStatus.' + statusKey) }} </span>
    <div v-if="showCommand">
      > <span style="color: #396225"> gop </span> version
    </div>
    <div v-if="showOutput">
      > <span>{{ goPlusVersion }}</span>
    </div>
  </div>
</template>

<style scoped>
.progress {
  margin: 50px 0 10px 0;
  width: 70%;
}

.code-line {
  vertical-align: top;
}

.status-output {
  width: 100%;
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
  text-align: left;
  padding: 5px;
  font-size: 15px;
  color: #909399;
  background-color: #F5F7FA;
  height: 100px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.annotation {
  color: rgba(48, 49, 51, 0.87);
  font-size: 14px;
}

.text-status {
  margin: 10px 0;
}
</style>