<script setup>
import { Loading } from "@element-plus/icons-vue";
import router from "../router";
import { getCurrentInstance, ref } from "vue";
const { proxy } = getCurrentInstance();

const isClick = ref(false)

const reCheck = () => {
  isClick.value = true;

  proxy.$api.checkReleasesApi().then(() => {
    proxy.$controller.callBackIndex(router)
  }).catch((err) => {
    setTimeout(()=>{
      isClick.value = false
    },2000)
    console.log("Ntework error:", err);
  });
};
</script>

<template>
  <el-empty :description="$t('errorNetwork.error')" image="/src/assets/images/error_network.png">
    <el-button type="warning" :icon="Loading" @click="reCheck" :loading="isClick" :disabled="isClick">
      {{ $t('errorNetwork.recheck') }}
    </el-button>
  </el-empty>
</template>