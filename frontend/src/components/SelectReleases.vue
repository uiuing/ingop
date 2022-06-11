<script setup>
import {getCurrentInstance, ref} from "vue";
import router from "../router";

const {proxy} = getCurrentInstance();

const value = ref("");
const options = ref([]);

proxy.$api.getReleasesData().then(data => {
  options.value = data;
  const stableChildren = data.find(item => item.label === "stable")["children"];
  value.value = stableChildren[0].value;
}).catch((err) => {
  console.error("getReleasesData error:", err);
  proxy.$controller.errorNetwork(router);
});

</script>

<template>
  <span class="text-title"> {{ $t('installationPrepare.selectRelease') }} </span>
  <el-cascader v-model="value" :options="options" size="small" />
</template>

<style scoped>
.text-title {
  color: #3A3A3A;
  font-size: 14px;
  margin-right: 10px;
}
</style>