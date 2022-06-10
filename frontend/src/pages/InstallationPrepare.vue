<script setup>
import SelectLanguage from "../components/SelectLanguage.vue";
import SelectReleases from "../components/SelectReleases.vue";
import { Download } from "@element-plus/icons-vue";
import { getCurrentInstance } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const { proxy } = getCurrentInstance();

const start = () => {
  proxy.$controller.checkGoEnvironment(router);
};

</script>

<template>
  <div class="locale-changer">
    <select-language />
  </div>
  <div class="text-title">
    <p> Hi &#x1F44B; </p>
    <p> {{ $t('installationPrepare.title') }} </p>
  </div>
  <select-releases />
  <div class="btn-start">
    <el-button @click="start" type="primary" :icon="Download" size="large" round>
      {{ $t('installationPrepare.start') }}
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
  margin: 30px 0;
  font-size: 20px;
  color: #3A3A3A;
}

.btn-start {
  margin-top: 60px;
}
</style>