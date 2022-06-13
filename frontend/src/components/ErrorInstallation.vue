<script setup>
import TipsGithubIssue from "../components/TipsGithubIssue.vue";

defineProps({
  errorKey: String
});
</script>
<template>
  <div class="text-tips">
    <b>{{ $t('errorGoEnvironment.reason') }} : </b>
    <span>{{ $t("installStatus.error." + errorKey) }}</span>
    <p>
      <tips-github-issue />
    </p>
  </div>
</template>
<style scoped>
.text-tips {
  margin:  auto;
  text-align: left;
  font-size: 18px;
  width: 430px;
}
</style>