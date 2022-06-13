<script setup>
const openGitHubIssue = () => {
  window.runtime.BrowserOpenURL("https://github.com/uiuing/goplus_installer-online/issues");
};
</script>
<template>
  <el-link type="primary" @click="openGitHubIssue">
    GitHub Issue : goplus_installer-online/issues
  </el-link>
</template>
