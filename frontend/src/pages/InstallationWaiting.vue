<script setup>
import StateInstallation from "../components/StateInstallation.vue";
import ErrorInstallation from "../components/ErrorInstallation.vue";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { CloseProcess, InstallGoPlus } from "../../wailsjs/go/main/App";

const route = useRoute();
const remoteURL = ref(route.params.remoteURL);
const isInstalling = ref(true);
const statusInstalling = ref("start");
const errorKey = ref("");
const isClose = ref(false);

InstallGoPlus(remoteURL.value).then((res) => {
  isInstalling.value = res.status;
  if (res.status) {
    statusInstalling.value = "end";
  } else {
    statusInstalling.value = "error";
    errorKey.value = res.key;
  }
  setTimeout(() => {
    isClose.value = true;
  }, 1300);
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
    <el-button :disabled="!isClose" @click="closeProcess">{{ $t("installationWaiting.close") }}</el-button>
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