<script setup>
import { getCurrentInstance, toRefs } from "vue";
import { useRouter } from "vue-router";
import { CheckGoEnvironment } from "../../wailsjs/go/main/App";
import { ref } from "vue";

const { proxy } = getCurrentInstance();
const router = useRouter();


const parentProps = defineProps(["remoteURL"]);

const { remoteURL } = toRefs(parentProps);


const isShow = ref(true);

CheckGoEnvironment().then((res) => {
  setTimeout(() => {
    proxy.$controller.startRun(res, router, remoteURL.value);
  }, 800);
  setTimeout(() => {
    isShow.value = false;
  }, 700);
});

</script>

<template>
  <el-dialog
      width="50%"
      :model-value="isShow"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :title="$t('installationPrepare.check')"
      top="20%"
      custom-class="check-dialog"
      center
  >
    <el-progress
        :percentage="100"
        status="success"
        :indeterminate="true"
        :duration="3"
        :show-text="false"
    />
  </el-dialog>
</template>

<style>
.el-dialog {
  border-radius: 9px;
}

.el-dialog__header {
  margin-right: 0;
}
</style>