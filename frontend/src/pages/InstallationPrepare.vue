<script setup>
import SelectLanguage from "../components/SelectLanguage.vue";
import SelectReleases from "../components/SelectReleases.vue";
import { Download } from "@element-plus/icons-vue";
import { getCurrentInstance, ref } from "vue";
import { useRouter } from "vue-router";
import TipsCheckGoEnvironment from "../components/CheckEnvironment.vue";

const router = useRouter();
const { proxy } = getCurrentInstance();

const isApiOK = ref(true);
const remoteURL = ref("");

const releaseChange = (url) => {
  isApiOK.value = false;
  remoteURL.value = url;
};

const isCheck = ref(false);

const start = () => {
  isCheck.value = true;
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
  <el-button @click="start" type="primary" :icon="Download" size="large" :disabled="isApiOK" round>
    {{ $t('installationPrepare.start') }}
  </el-button>
  <div class="select-releases">
    <select-releases @releaseChange="releaseChange" />
  </div>
  <tips-check-go-environment :remoteURL="remoteURL" v-if="isCheck" />
</template>

<style scoped>
.locale-changer {
  display: flex;
  justify-content: flex-end;
}

.text-title {
  font-size: 60px;
  font-weight: bold;
  margin-top: 40px;
}

.text-title p:first-child {
  font-style: italic;
}

.text-title p:last-child {
  margin: 50px 0 30px 0;
  font-size: 20px;
  color: #3A3A3A;
}

.select-releases {
  position: absolute;
  bottom: 20px;
  right: 158px;
}
</style>