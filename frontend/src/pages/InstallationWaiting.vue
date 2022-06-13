<script setup>
import StateInstallation from "../components/StateInstallation.vue";
import ErrorInstallation from "../components/ErrorInstallation.vue";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { StartInstall, CloseProcess } from "../../wailsjs/go/main/App";

const route = useRoute();

const remoteAddress = ref(route.params.remoteAddress);
const isInstalling = ref(true);
const statusInstalling = ref("start");
const errorKey = ref("");
const isClose = ref(true);

StartInstall(remoteAddress.value).then((res) => {
  isInstalling.value = res.status;
  if (res.status) {
    statusInstalling.value = "end";
  } else {
    statusInstalling.value = "error";
    errorKey.value = res.key;
  }
  isClose.value = false;
}).catch(() => {
  statusInstalling.value = "error";
  errorKey.value = "apiError";
  isClose.value = false;
});

const closeProcess = () => {
  CloseProcess();
};

</script>

<template>
  <p class="text-title">
    {{ $t("installationWaiting." + statusInstalling) }}
  </p>
  <div>
    <state-installation v-if="isInstalling" />
    <error-installation :errorKey="errorKey" v-else />
  </div>
  <div class="btn-close">
    <el-button :disabled="isClose" @click="closeProcess">{{ $t("installationWaiting.close") }}</el-button>
  </div>
</template>

<style scoped>
.text-title {
  margin: 50px 0;
  font-size: 30px;
}

.btn-close {
  position: absolute;
  right: 40px;
  bottom: 40px;
}
</style>