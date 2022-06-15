<script setup>
import TipsGithubIssue from "../components/TipsGithubIssue.vue";
import TipsCheckEnvironment from "../components/CheckEnvironment.vue";

import { useRoute } from "vue-router";
import { ref } from "vue";

const route = useRoute();
const key = ref(route.params.key);
const remoteURL = ref(route.params.remoteURL);

const isCheck = ref(false);


const downloadGo = () => {
  window.runtime.BrowserOpenURL("https://go.dev/dl");
};

const recheck = () => {
  isCheck.value = true;
};
</script>

<template>
  <h1>{{ $t('errorGoEnvironment.error') }}</h1>
  <div class="text-tips">
    <b>{{ $t('errorGoEnvironment.reason') }} : </b>
    <span>{{ $t('errorGoEnvironment.' + key) }}</span>
    <p>
      <el-link type="primary" @click="downloadGo">
        {{ $t('errorGoEnvironment.downloadGo') }} : https://go.dev/dl
      </el-link>
    </p>
    <p>
      <tips-github-issue />
    </p>
  </div>
  <div class="btn-recheck">
    <el-button @click="recheck" type="warning" plain>{{
        $t('errorGoEnvironment.recheck')
      }}
    </el-button>
  </div>
  <tips-check-environment :remoteURL="remoteURL" v-if="isCheck" />
</template>

<style scoped>
.text-tips {
  margin: 60px auto;
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