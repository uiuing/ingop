<script setup>
import { useRoute, useRouter } from "vue-router";
import { getCurrentInstance, ref } from "vue";

const router = useRouter();
const route = useRoute();
const { proxy } = getCurrentInstance();
const message = ref(route.params.message);

const downloadGo = () => {
  window.runtime.BrowserOpenURL("https://go.dev/dl");
};
const recheck = () => {
  proxy.$controller.checkGoEnvironment(router);
};
</script>
<template>
  <h1>{{ $t('errorGoEnvironment.error') }}</h1>
  <div class="text-tips">
    <b>{{ $t('errorGoEnvironment.reason') }} : </b>
    <span>{{ $t('errorGoEnvironment.' + message) }}</span>
    <p>
      <el-link type="primary" @click="downloadGo">
        {{ $t('errorGoEnvironment.downloadGo') }} : https://go.dev/dl
      </el-link>
    </p>
  </div>
  <div class="btn-recheck">
    <el-button @click="recheck" type="warning" plain>{{
        $t('errorGoEnvironment.recheck')
      }}
    </el-button>
  </div>
</template>

<style scoped>
.text-tips {
  margin: 80px auto;
  text-align: left;
  font-size: 18px;
  width: 430px;
}

.text-tips > span {
  color: #E6A23C;
}

.btn-recheck {
  position: absolute;
  right: 20px;
  bottom: 20px;
}
</style>